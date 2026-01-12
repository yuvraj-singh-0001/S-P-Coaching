const Student = require("../../models/Student");

function monthDiff(from, to) {
  return (
    to.getFullYear() * 12 +
    to.getMonth() -
    (from.getFullYear() * 12 + from.getMonth())
  );
}

async function studentDashboard(req, res) {
  try {
    const userId = req.user._id;

    const student = await Student.findOne({ userId }).lean();

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student record not found"
      });
    }

    const now = new Date();
    const monthlyFee = Number(student.fees?.monthlyFee || 0);

    const admissionStart = new Date(
      new Date(student.admissionDate).getTime() + 3 * 24 * 60 * 60 * 1000
    );

    const dueMonths =
      monthlyFee > 0
        ? Math.max(monthDiff(admissionStart, now) + 1, 0)
        : 0;

    let paidMonths = 0;
    let totalPaid = 0;
    let lastPaidMonth = null;

    if (Array.isArray(student.fees?.history)) {
      for (const h of student.fees.history) {
        const from = new Date(h.fromMonth + "-01");
        const to = new Date(h.toMonth + "-01");
        paidMonths += monthDiff(from, to);
        totalPaid += Number(h.amount || 0);
        lastPaidMonth = h.toMonth;
      }
    }

    const remainingMonths = Math.max(dueMonths - paidMonths, 0);

    return res.json({
      success: true,
      dashboard: {
        profile: {
          name: student.name,
          email: student.email,
          className: student.className,
          admissionStatus: student.admissionStatus,
          admissionDate: student.admissionDate
        },
        fees: {
          monthlyFee,
          totalPaid,
          remainingMonths,
          remainingAmount: remainingMonths * monthlyFee,
          lastPaidMonth
        }
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = studentDashboard;

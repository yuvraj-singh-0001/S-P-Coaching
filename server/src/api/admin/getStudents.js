const Student = require("../../models/Student");

function monthDiff(from, to) {
  return (
    to.getFullYear() * 12 +
    to.getMonth() -
    (from.getFullYear() * 12 + from.getMonth())
  );
}

async function getStudents(req, res) {
  try {
    const { status, className, search } = req.query;

    let query = {};
    if (status) query.admissionStatus = status;
    if (className) query.className = className;
    if (search) query.name = { $regex: search, $options: "i" };

    const students = await Student.find(query).sort({ admissionDate: -1 });

    const now = new Date();

    const enriched = students.map((s) => {
      const monthlyFee = Number(s.fees?.monthlyFee || 0);

      // Admission starts after 3 days
      const admissionStart = new Date(
        new Date(s.admissionDate).getTime() + 3 * 24 * 60 * 60 * 1000
      );

      const dueMonths =
        monthlyFee > 0
          ? Math.max(monthDiff(admissionStart, now) + 1, 0)
          : 0;

      // Paid months calculation from history
      let paidMonths = 0;
      let totalPaid = 0;
      let lastPaidMonth = null;

      if (Array.isArray(s.fees?.history)) {
        s.fees.history.forEach((h) => {
          const from = new Date(h.fromMonth + "-01");
          const to = new Date(h.toMonth + "-01");
          const m = monthDiff(from, to);
          paidMonths += m;
          totalPaid += Number(h.amount || 0);
          lastPaidMonth = h.toMonth;
        });
      }

      const remainingMonths = Math.max(dueMonths - paidMonths, 0);
      const remainingAmount = remainingMonths * monthlyFee;

      return {
        ...s.toObject(),
        calculatedFees: {
          monthlyFee,
          dueMonths,
          paidMonths,
          remainingMonths,
          remaining: remainingAmount,
          totalPaid,
          lastMonth: lastPaidMonth,
        },
      };
    });

    res.json({
      success: true,
      students: enriched,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = getStudents;

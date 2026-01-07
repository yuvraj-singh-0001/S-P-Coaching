const Student = require("../../models/Student");

function monthsBetween(startDate, endDate) {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1
  );
}

async function getStudents(req, res) {
  try {
    const { status, className, search } = req.query;

    let query = {};
    if (status) query.admissionStatus = status;
    if (className) query.className = className;
    if (search) query.name = { $regex: search, $options: "i" };

    const students = await Student
      .find(query)
      .sort({ admissionDate: -1 })
      .lean();

    const now = new Date();

    const result = students.map((s) => {
      const monthlyFee = Number(s?.fees?.monthlyFee || 0);
      const history = Array.isArray(s?.fees?.history)
        ? s.fees.history
        : [];

      const feeStartDate = new Date(
        new Date(s.admissionDate).getTime() + 3 * 24 * 60 * 60 * 1000
      );

      let monthsDue = 0;
      if (monthlyFee > 0 && now >= feeStartDate) {
        monthsDue = monthsBetween(feeStartDate, now);
      }

      const totalPayable = monthsDue * monthlyFee;
      const totalPaid = history.reduce(
        (sum, h) => sum + Number(h.amount || 0),
        0
      );

      const remaining = Math.max(totalPayable - totalPaid, 0);
      const advanceBalance =
        totalPaid > totalPayable ? totalPaid - totalPayable : 0;

      const lastPayment =
        history.length > 0 ? history[history.length - 1] : null;

      return {
        ...s,
        calculatedFees: {
          monthlyFee,
          monthsDue,
          totalPayable,
          totalPaid,
          remaining,
          advanceBalance,
          lastPayment,
          isCompleted:
            monthlyFee > 0 && monthsDue > 0 && remaining === 0,
        },
      };
    });

    res.json({
      success: true,
      students: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = getStudents;

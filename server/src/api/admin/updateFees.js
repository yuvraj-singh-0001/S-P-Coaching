const Student = require("../../models/Student");
const { sendMail } = require("../../utils/email");

function ym(date) {
  return date.toISOString().slice(0, 7);
}

async function updateFees(req, res) {
  try {
    const { id } = req.params;
    const { monthsCount, amount } = req.body;

    if (!monthsCount || monthsCount <= 0 || !amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid months or amount",
      });
    }

    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student.fees.history = student.fees.history || [];

    // last paid month logic
    let startDate;
    if (student.fees.history.length > 0) {
      startDate = new Date(
        student.fees.history[student.fees.history.length - 1].toMonth + "-01"
      );
    } else {
      startDate = new Date(
        new Date(student.admissionDate).getTime() + 3 * 24 * 60 * 60 * 1000
      );
    }

    const fromMonth = ym(startDate);
    startDate.setMonth(startDate.getMonth() + Number(monthsCount));
    const toMonth = ym(startDate);

    student.fees.history.push({
      fromMonth,
      toMonth,
      amount: Number(amount),
      paidAt: new Date(),
    });

    await student.save();

    // 📧 EMAIL (ADVANCE SAFE)
    if (student.email) {
      await sendMail(
        student.email,
        "Fees Update – SP Coaching",
        `
          <p>Hello <b>${student.name}</b>,</p>
          <p>Fees received for period:</p>
          <p><b>${fromMonth}</b> to <b>${toMonth}</b></p>
          <p>Amount Paid: ₹${amount}</p>
          <p>If this exceeds current dues, it will be adjusted as advance.</p>
          <p>– SP Coaching</p>
        `
      );
    }

    res.json({
      success: true,
      message: "Fees updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = updateFees;

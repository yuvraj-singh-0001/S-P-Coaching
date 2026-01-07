const Student = require("../../models/Student");
const { sendMail } = require("../../utils/email");

// ===================== UPDATE FEES =====================
async function updateFees(req, res) {
  try {
    const { id } = req.params;
    const { month, amount } = req.body;

    if (!month || !amount) {
      return res.status(400).json({
        success: false,
        message: "Month and amount are required"
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // ================= UPDATE FEES =================
    student.fees.paid += Number(amount);
    student.fees.remaining =
      student.fees.total - student.fees.paid;

    student.fees.history.push({
      month,
      amount
    });

    await student.save();

    // ================= SEND EMAIL =================
    if (student.email) {
      await sendMail(
        student.email,
        "Fees Update – SP Coaching",
        `
          <p>Hello <b>${student.name}</b>,</p>

          <p>Your fees for <b>${month}</b> has been updated.</p>

          <p>
            Paid this month: ₹${amount}<br/>
            Total Paid: ₹${student.fees.paid}<br/>
            Remaining Fees: ₹${student.fees.remaining}
          </p>

          <p>Thank you,<br/>SP Coaching</p>
        `
      );
    }

    res.json({
      success: true,
      message: "Fees updated successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = updateFees;

const Student = require("../../models/Student");
const { sendMail } = require("../../utils/email");

// ===================== UPDATE ADMISSION STATUS =====================
async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const student = await Student.findByIdAndUpdate(
      id,
      { admissionStatus: status },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    let subject = "";
    let htmlMessage = "";

    if (status === "Approved") {
      subject = "🎉 Admission Approved – SP Coaching";
      htmlMessage = `
        <h2>Hello ${student.name},</h2>
        <p>Your admission has been <b>APPROVED</b>.</p>
        <p>Please visit the institute for further steps.</p>
        <p>Regards,<br/>SP Coaching</p>
      `;
    }

    if (status === "Rejected") {
      subject = "❗ Admission Update – SP Coaching";
      htmlMessage = `
        <h2>Hello ${student.name},</h2>
        <p>Your admission request has been <b>REJECTED</b>.</p>
        <p>Please contact the institute.</p>
        <p>Regards,<br/>SP Coaching</p>
      `;
    }

    if (student.email) {
      await sendMail(student.email, subject, htmlMessage);
    }

    res.json({
      success: true,
      message: "Status Updated + Email Sent"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = updateStatus;

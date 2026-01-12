const Student = require("../../models/Student");
const { sendMail } = require("../../utils/email");

async function sendNotification(req, res) {
  try {
    const { type, fromDate, toDate, course } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Notification type is required"
      });
    }

    let students = [];

    if (type === "dueFees") {
      students = await Student.find({ admissionStatus: "Approved" });
    }

    if (type === "holiday") {
      students = await Student.find({ admissionStatus: "Approved" });
    }

    if (type === "test") {
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Course required"
        });
      }

      students = await Student.find({
        admissionStatus: "Approved",
        className: course
      });
    }

    if (!students.length) {
      return res.status(400).json({
        success: false,
        message: "No students found"
      });
    }

    /* ===== RESPOND FIRST (IMPORTANT) ===== */
    res.json({
      success: true,
      message: "Notifications sending in background",
      count: students.length
    });

    /* ===== BACKGROUND EMAIL SEND ===== */
    students.forEach((s) => {
      if (!s.email) return;

      let html = `<p>Hello ${s.name}</p>`;

      if (type === "dueFees") {
        html += `<p>Your fees are pending.</p>`;
      }

      if (type === "holiday") {
        html += `<p>Holiday: ${fromDate}${toDate ? ` to ${toDate}` : ""}</p>`;
      }

      if (type === "test") {
        html += `<p>Test scheduled for ${course}</p>`;
      }

      sendMail(
        s.email,
        "SP Coaching Notification",
        html
      ).catch(err => {
        console.error("Email failed:", err.message);
      });
    });

  } catch (err) {
    console.error("NOTIFICATION ERROR:", err);
  }
}

module.exports = sendNotification;

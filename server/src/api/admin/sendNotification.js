const Student = require("../../models/Student");
const { sendMail } = require("../../utils/email");

async function sendNotification(req, res) {
  try {
    const {
      type,        // "holiday" | "dueFees" | "test"
      fromDate,
      toDate,
      course
    } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Notification type is required"
      });
    }

    let students = [];

    // =========================
    // 🔴 DUE FEES NOTIFICATION
    // =========================
    if (type === "dueFees") {
      students = await Student.find({
        "fees.remaining": { $gt: 0 },   // ✅ FIXED
        admissionStatus: "Approved"
      });
    }

    // =========================
    // 🟡 HOLIDAY NOTIFICATION
    // =========================
    if (type === "holiday") {
      if (!fromDate) {
        return res.status(400).json({
          success: false,
          message: "Holiday start date is required"
        });
      }

      students = await Student.find({
        admissionStatus: "Approved"
      });
    }

    // =========================
    // 🔵 TEST NOTIFICATION
    // =========================
    if (type === "test") {
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Course is required for test notification"
        });
      }

      students = await Student.find({
        className: course,
        admissionStatus: "Approved"
      });
    }

    if (!students.length) {
      return res.status(400).json({
        success: false,
        message: "No students found for this notification"
      });
    }

    // =========================
    // 📧 SEND EMAILS
    // =========================
    for (const s of students) {
      if (!s.email) continue;

      let html = "";

      // 🔴 DUE FEES MAIL
      if (type === "dueFees") {
        const lastHistory = s.fees.history?.slice(-1)[0];

        html = `
          <p>Hello <b>${s.name}</b>,</p>

          <p>This is a reminder that your fees is pending.</p>

          <p>
            <b>Remaining Amount:</b> ₹${s.fees.remaining}<br/>
            <b>Last Payment:</b> ${
              lastHistory
                ? `${lastHistory.amount} (on ${new Date(lastHistory.date).toLocaleDateString()})`
                : "No payment yet"
            }
          </p>

          <p>Please clear the pending fees at the earliest.</p>

          <p>– <b>SP Coaching</b></p>
        `;
      }

      // 🟡 HOLIDAY MAIL
      if (type === "holiday") {
        html = `
          <p>Hello <b>${s.name}</b>,</p>

          <p>There will be a holiday from:</p>

          <p>
            <b>${fromDate}${toDate ? ` to ${toDate}` : ""}</b>
          </p>

          <p>Enjoy your time 😊</p>

          <p>– <b>SP Coaching</b></p>
        `;
      }

      // 🔵 TEST MAIL
      if (type === "test") {
        html = `
          <p>Hello <b>${s.name}</b>,</p>

          <p>An upcoming test has been scheduled.</p>

          <p>
            <b>Course:</b> ${course}
          </p>

          <p>Please be prepared.</p>

          <p>– <b>SP Coaching</b></p>
        `;
      }

      await sendMail(
        s.email,
        "SP Coaching Notification",
        html
      );
    }

    return res.json({
      success: true,
      message: "Notification sent successfully",
      count: students.length
    });

  } catch (err) {
    console.error("NOTIFICATION ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
}

module.exports = sendNotification;

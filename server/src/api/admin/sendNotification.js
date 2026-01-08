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

    /* ================= DUE FEES (🔥 FIXED) ================= */
    if (type === "dueFees") {
      // 1️⃣ fetch approved students only
      const all = await Student.find({
        admissionStatus: "Approved"
      });

      const now = new Date();

      students = all.filter((s) => {
        const monthlyFee = Number(s.fees?.monthlyFee || 0);
        if (!monthlyFee) return false;

        // admission starts after 3 days
        const start = new Date(
          new Date(s.admissionDate).getTime() + 3 * 24 * 60 * 60 * 1000
        );

        const monthsDue =
          (now.getFullYear() * 12 + now.getMonth()) -
          (start.getFullYear() * 12 + start.getMonth()) + 1;

        let paidMonths = 0;

        if (Array.isArray(s.fees?.history)) {
          s.fees.history.forEach((h) => {
            const from = new Date(h.fromMonth + "-01");
            const to = new Date(h.toMonth + "-01");
            paidMonths +=
              (to.getFullYear() * 12 + to.getMonth()) -
              (from.getFullYear() * 12 + from.getMonth());
          });
        }

        return monthsDue - paidMonths > 0; // 🔥 REAL DUE FEES
      });
    }

    /* ================= HOLIDAY ================= */
    if (type === "holiday") {
      if (!fromDate) {
        return res.status(400).json({
          success: false,
          message: "Holiday date required"
        });
      }

      students = await Student.find({
        admissionStatus: "Approved"
      });
    }

    /* ================= TEST ================= */
    if (type === "test") {
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Course is required for test notification"
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
        message: "No students found for this notification"
      });
    }

    /* ================= SEND EMAIL ================= */
    for (const s of students) {
      if (!s.email) continue;

      let html = "";

      if (type === "dueFees") {
        html = `
          <p>Hello <b>${s.name}</b>,</p>
          <p>This is a reminder that your fees are pending.</p>
          <p>Please clear the fees at the earliest.</p>
          <p>– SP Coaching</p>
        `;
      }

      if (type === "holiday") {
        html = `
          <p>Hello <b>${s.name}</b>,</p>
          <p>There will be a holiday:</p>
          <p><b>${fromDate}${toDate ? ` to ${toDate}` : ""}</b></p>
          <p>– SP Coaching</p>
        `;
      }

      if (type === "test") {
        html = `
          <p>Hello <b>${s.name}</b>,</p>
          <p>An upcoming test is scheduled for:</p>
          <p><b>${course}</b></p>
          <p>Please be prepared.</p>
          <p>– SP Coaching</p>
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

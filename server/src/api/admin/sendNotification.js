// Import Student model from database
const Student = require("../../models/Student");

// Import email sending utility (Gmail / SMTP)
const { sendMail } = require("../../utils/email");

// Main function to send notifications
async function sendNotification(req, res) {
  try {
    // Get notification details from request body
    const { type, fromDate, toDate, course } = req.body;

    // If notification type is missing, return error
    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Notification type is required"
      });
    }

    // Empty array to store students
    let students = [];

    // ================= DUE FEES NOTIFICATION =================
    // Get all approved students for fees reminder
    if (type === "dueFees") {
      students = await Student.find({
        admissionStatus: "Approved"
      });
    }

    // ================= HOLIDAY NOTIFICATION =================
    // Get all approved students for holiday message
    if (type === "holiday") {
      students = await Student.find({
        admissionStatus: "Approved"
      });
    }

    // ================= TEST NOTIFICATION =================
    // Course name is required for test notification
    if (type === "test") {
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Course required"
        });
      }

      // Get approved students of selected course
      students = await Student.find({
        admissionStatus: "Approved",
        className: course
      });
    }

    // If no students found, return error
    if (!students.length) {
      return res.status(400).json({
        success: false,
        message: "No students found"
      });
    }

    // ================= SEND RESPONSE FIRST =================
    // API responds immediately without waiting for emails
    res.json({
      success: true,
      message: "Notifications sending in background",
      count: students.length
    });

    // ================= BACKGROUND EMAIL SENDING =================
    // Emails will be sent one by one in background
    students.forEach((student) => {
      // Skip if student email does not exist
      if (!student.email) return;

      // Default email message
      let html = `<p>Hello ${student.name}</p>`;

      // Due fees email message
      if (type === "dueFees") {
        html += `<p>Your fees are pending. Please pay as soon as possible.</p>`;
      }

      // Holiday email message
      // ================= HOLIDAY EMAIL MESSAGE =================
      if (type === "holiday") {

        // Convert date into DD/MM/YYYY format
        const formatDate = (date) => {
          if (!date) return "";
          const d = new Date(date);
          const day = String(d.getDate()).padStart(2, "0");
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const year = d.getFullYear();
          return `${day}/${month}/${year}`;
        };

        html += `
    <p><strong>Holiday Notice – SP Coaching Classes</strong></p>
    <p>This is to inform you that the coaching classes will remain closed due to holiday.</p>
    <p><strong>Date:</strong> ${formatDate(fromDate)}
    ${toDate ? ` to ${formatDate(toDate)}` : ""}</p>
    <p>Classes will resume as per the regular schedule.</p>
    <p>Regards,<br/>SP Coaching Classes</p>
  `;
      }


      // Test notification email message
      if (type === "test") {
        html += `<p>Test scheduled for ${course}. Please prepare well.</p>`;
      }

      // Send email using Gmail / SMTP
      sendMail(
        student.email,
        "SP Coaching Notification",
        html
      ).catch(error => {
        // Log error if email fails
        console.error("Email failed:", error.message);
      });
    });

  } catch (error) {
    // Log unexpected server error
    console.error("NOTIFICATION ERROR:", error);
  }
}

// Export function
module.exports = sendNotification;

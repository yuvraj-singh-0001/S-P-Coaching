// Import Student Model
const Student = require("../../models/Student");

// Import Email Sender Utility (Already Created by You)
const { sendMail } = require("../../utils/email");


// ===================== GET STUDENTS (FILTER + SEARCH) =====================
async function getStudents(req, res) {
  try {
    const { status, className, search } = req.query;

    let query = {};

    // Filter by Admission Status
    if (status) query.admissionStatus = status;

    // Filter by Class
    if (className) query.className = className;

    // Search by Student Name
    if (search)
      query.name = { $regex: search, $options: "i" };

    const students = await Student.find(query).sort({ admissionDate: -1 });

    res.json({
      success: true,
      students
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}



// ===================== UPDATE ADMISSION STATUS =====================
async function updateStatus(req, res) {
  try {
    const { id } = req.params;      // Student ID from URL
    const { status } = req.body;    // New Status from Admin

    /* 
      1️⃣ First Update Status in Database
      2️⃣ Also return updated student to use details (email, name etc.)
    */
    const student = await Student.findByIdAndUpdate(
      id,
      { admissionStatus: status },
      { new: true }
    );

    // If Student Not Found
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found"
      });
    }

    // ================= EMAIL PREPARATION =================
    let subject = "";
    let htmlMessage = "";

    // If Admin APPROVES Admission
    if (status === "Approved") {
      subject = "🎉 Admission Approved – SP Coaching";
      htmlMessage = `
        <h2>Hello ${student.name},</h2>
        <p>Congratulations! Your admission has been <b>APPROVED</b>.</p>
        <p>You may now visit the institute for further process.</p>
        <br/>
        <p>Regards,<br/>SP Coaching</p>
      `;
    }

    // If Admin REJECTS Admission
    else if (status === "Rejected") {
      subject = "❗ Admission Update – SP Coaching";
      htmlMessage = `
        <h2>Hello ${student.name},</h2>
        <p>We are sorry to inform you that your admission request has been <b>REJECTED</b>.</p>
        <p>For more details, please contact the institute.</p>
        <br/>
        <p>Regards,<br/>SP Coaching</p>
      `;
    }

    /*
      Only Send Email If Student Has Email.
      (In case frontend didn't collect email)
    */
    if (student.email) {
      await sendMail(student.email, subject, htmlMessage);
    }

    return res.json({
      success: true,
      message: "Status Updated + Notification Email Sent"
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}



// ===================== UPDATE FEES =====================
async function updateFees(req, res) {
  try {
    const { id } = req.params;
    const { total, paid } = req.body;

    const remaining = total - paid;

    await Student.findByIdAndUpdate(id, {
      fees: { total, paid, remaining }
    });

    res.json({ success: true, message: "Fees Updated Successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}



// ===================== DELETE STUDENT =====================
async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);

    res.json({ success: true, message: "Student Removed" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}



// ===================== UPDATE FULL STUDENT =====================
async function updateStudent(req, res) {
  try {
    const { id } = req.params;

    const updated = await Student.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Student Updated Successfully",
      student: updated
    });
    
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
}



// ===================== EXPORT MODULES =====================
module.exports = {
  getStudents,
  updateStatus,
  updateFees,
  deleteStudent,
  updateStudent
};

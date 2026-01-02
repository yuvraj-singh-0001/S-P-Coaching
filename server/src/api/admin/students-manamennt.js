const Student = require("../../models/Student");

// Get all students + filters
async function getStudents(req, res) {
  try {
    const { status, className, search } = req.query;

    let query = {};

    if (status) query.admissionStatus = status;
    if (className) query.className = className;
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

// Update Status
async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Student.findByIdAndUpdate(id, {
      admissionStatus: status
    });

    res.json({ success: true, message: "Status Updated Successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// Update Fees
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

// Delete Student
async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ success: true, message: "Student Removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
// UPDATE FULL STUDENT DATA
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

module.exports = {
  getStudents,
  updateStatus,
  updateFees,
  deleteStudent,
  updateStudent
};



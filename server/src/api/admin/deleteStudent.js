const Student = require("../../models/Student");

// ===================== DELETE STUDENT =====================
async function deleteStudent(req, res) {
  try {
    const { id } = req.params;

    await Student.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Student Removed"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = deleteStudent;

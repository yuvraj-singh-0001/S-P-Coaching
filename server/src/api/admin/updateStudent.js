const Student = require("../../models/Student");

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
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = updateStudent;

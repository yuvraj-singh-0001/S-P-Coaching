const Student = require("../../models/Student");

// ===================== GET STUDENTS =====================
async function getStudents(req, res) {
  try {
    const { status, className, search } = req.query;

    let query = {};

    if (status) query.admissionStatus = status;
    if (className) query.className = className;
    if (search) query.name = { $regex: search, $options: "i" };

    const students = await Student.find(query).sort({ admissionDate: -1 });

    res.json({
      success: true,
      students
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = getStudents;

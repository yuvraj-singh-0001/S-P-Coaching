const Student = require("../../models/Student");

async function admission(req, res) {
  try {
    const { name, email, phone, className } = req.body;

    if (!name || !email || !phone || !className) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const student = await Student.create({
      name,
      email,
      phone,
      className,
    });

    return res.status(200).json({
      success: true,
      message: "Student Admission Successful",
      data: student,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}

module.exports = admission;

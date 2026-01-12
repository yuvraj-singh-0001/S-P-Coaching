const Student = require("../../models/Student");

async function admission(req, res) {
  try {
    const user = req.user; // 🔐 from auth middleware

    const { phone, className, monthlyFee } = req.body;

    // 🔎 BASIC VALIDATION
    if (!phone || !className || !monthlyFee) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    // ❌ BLOCK DUPLICATE ADMISSION (USER BASED)
    const existingStudent = await Student.findOne({ userId: user._id });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Admission already submitted"
      });
    }

    // ✅ CREATE STUDENT (AUTO-FILLED DATA)
    const student = await Student.create({
      userId: user._id,        // 🔥 REQUIRED FIX
      name: user.name,         // auto from login
      email: user.email,       // auto from login
      phone,
      className,
      admissionStatus: "Pending",
      fees: {
        monthlyFee: Number(monthlyFee)
      }
    });

    res.json({
      success: true,
      message: "🎉 Admission Form Submitted Successfully!",
      studentId: student._id
    });

  } catch (err) {
    console.error("Admission Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

module.exports = admission;

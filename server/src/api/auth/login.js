const User = require("../../models/User");
const Student = require("../../models/Student"); // ✅ ADD
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.token = token;
    await user.save();

    // 🔽 DEFAULT
    let admissionStatus = null;

    // 🔍 ONLY FOR STUDENT (lightweight query)
    if (user.role === "student") {
      const student = await Student.findOne({ userId: user._id })
        .select("admissionStatus")
        .lean();

      admissionStatus = student?.admissionStatus || "Pending";
    }

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        admissionStatus // ✅ NOW FRONTEND CAN DECIDE
      }
    });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
}

module.exports = login;

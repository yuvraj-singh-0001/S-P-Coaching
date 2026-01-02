const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= SIGNUP =================
async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.json({ success: false, message: "All fields required" });

    const existing = await User.findOne({ email });

    if (existing)
      return res.json({
        success: false,
        message: "User already exists"
      });

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPass,
      role: role || "student"
    });

    res.json({
      success: true,
      message: "User Registered Successfully",
      user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}



// ================= LOGIN ==================
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.json({
        success: false,
        message: "User not found"
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.json({
        success: false,
        message: "Invalid Password"
      });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.token = token;
    await user.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,          // false in localhost if needed
      sameSite: "none"
    });

    res.json({
      success: true,
      message: "Login Successful",
      user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}



// ================= LOGOUT ==================
async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
      message: "Logged Out"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}



module.exports = {
  signup,
  login,
  logout
};

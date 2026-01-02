const User = require("../../models/User");

// ================= LOGOUT ==================
async function logout(req, res) {
  try {
    const token = req.cookies?.token;

    if (token) {
      await User.findOneAndUpdate({ token }, { token: "" });
    }

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

module.exports = logout;

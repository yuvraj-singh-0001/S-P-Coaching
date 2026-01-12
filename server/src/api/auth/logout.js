const User = require("../../models/User");

// ================= LOGOUT ==================
async function logout(req, res) {
  try {
    const token = req.cookies?.token;

    if (token) {
      await User.findOneAndUpdate({ token }, { token: "" });
    }

    const isProd = process.env.NODE_ENV === "production";

    // Clear auth cookie with same options used when setting it
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
    });

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

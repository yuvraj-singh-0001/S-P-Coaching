const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// ================= UPDATE PROFILE =================
async function updateProfile(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated"
      });
    }

    const userId = req.user._id; // comes from auth middleware
    const { name, email, password } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // password optional
    if (password && password.trim() !== "") {
      const hashedPass = await bcrypt.hash(password, 10);
      updateData.password = hashedPass;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = updateProfile;

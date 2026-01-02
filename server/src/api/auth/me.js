// ================= AUTH ME =================
// Purpose: Check logged-in user via cookie token

async function me(req, res) {
  try {
    // req.user comes from auth middleware
    const user = req.user;

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = me;

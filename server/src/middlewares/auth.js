const jwt = require("jsonwebtoken");
const User = require("../../models/User"); // ✅ FIXED PATH

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Not Logged In"
      });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.token !== token)
      return res.status(401).json({
        success: false,
        message: "Invalid Session"
      });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
};

// ONLY ADMIN ACCESS
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({
      success: false,
      message: "Access Denied"
    });

  next();
};

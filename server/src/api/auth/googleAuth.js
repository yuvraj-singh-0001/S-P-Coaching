const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Student = require("../../models/Student");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing",
      });
    }

    // 🔐 Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub } = payload;

    // 🔎 Find user
    let user = await User.findOne({ email });

    let isNewUser = false;

    // 🆕 Create user if not exists
    if (!user) {
      user = await User.create({
        name,
        email,
        password: sub,      // dummy password (Google user)
        role: "student",    // 🔒 force student
      });
      isNewUser = true;
    }

    // ❌ Block admin via Google
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin must login using email & password",
      });
    }

    // 🔑 Create JWT
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.token = jwtToken;
    await user.save();

    // 🔽 DEFAULT
    let admissionStatus = null;

    // 🔍 ONLY FOR STUDENT (same logic as email login)
    if (user.role === "student") {
      const student = await Student.findOne({ userId: user._id })
        .select("admissionStatus")
        .lean();

      admissionStatus = student?.admissionStatus || "Pending";
    }

    // 🍪 Set cookie
    res
      .cookie("token", jwtToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          admissionStatus,
        },
        isNewUser, // ✅ IMPORTANT FLAG
      });

  } catch (err) {
    console.error("Google Auth Error:", err.message);
    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

module.exports = googleAuth;

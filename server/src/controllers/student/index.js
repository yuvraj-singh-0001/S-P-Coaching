const express = require("express");
const router = express.Router();

// ===== CONTROLLERS =====
const admission = require("../../api/student/admission");
const studentDashboard = require("../../api/student/dashboard");
const authMiddleware = require("../../middlewares/auth"); // 🔐 ADD


// ================= ROUTES =================

// 🔐 STUDENT DASHBOARD (SINGLE API)
router.get("/dashboard", authMiddleware.auth ,studentDashboard);

// 🔐 ADMISSION (LOGIN REQUIRED)
router.post("/admission", authMiddleware.auth, admission);

module.exports = router;

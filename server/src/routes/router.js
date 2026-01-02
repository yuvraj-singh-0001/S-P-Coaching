const express = require("express");
const router = express.Router();

const studentRoutes = require("../controllers/student/index");
const contactRoutes = require("../controllers/contact/index");
const adminRoutes = require("../controllers/admin/index");

// /api/contact/*
router.use("/contact", contactRoutes);

// /api/student/*
router.use("/student", studentRoutes);
// /api/admin/*
router.use("/admin", adminRoutes);

module.exports = router;

const express = require("express");
const router = express.Router();

const studentRoutes = require("../controllers/student/index");
const contactRoutes = require("../controllers/contact/index");

// /api/contact/*
router.use("/contact", contactRoutes);

// /api/student/*
router.use("/student", studentRoutes);

module.exports = router;

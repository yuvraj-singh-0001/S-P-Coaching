const express = require("express");
const router = express.Router();

const studentRoutes = require("../controllers/student/index");

// /api/student/*
router.use("/student", studentRoutes);

module.exports = router;

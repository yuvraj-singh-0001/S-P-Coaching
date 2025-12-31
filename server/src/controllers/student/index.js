const express = require("express");
const router = express.Router();

const  admission = require("../../api/student/admission");

// Route
router.post("/admission", admission);

module.exports = router;

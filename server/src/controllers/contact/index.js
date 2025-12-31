const express = require("express");
const router = express.Router();
const enquiry = require("../../api/contact/enquiry");

// Route
router.post("/enquiry", enquiry);   
module.exports = router;
const express = require("express");
const router = express.Router();
const getStudents = require("../../api/admin/getStudents");
const updateStatus = require("../../api/admin/updateStatus");
const updateFees = require("../../api/admin/updateFees");
const deleteStudent = require("../../api/admin/deleteStudent");
const updateStudent = require("../../api/admin/updateStudent");
const sendNotification = require("../../api/admin/sendNotification");

// GET students with filters
router.get("/students", getStudents);

// UPDATE status
router.put("/students/status/:id", updateStatus);

// UPDATE fees
router.put("/students/fees/:id", updateFees);

// DELETE
router.delete("/students/:id", deleteStudent);
// UPDATE full student data
router.put("/students/:id", updateStudent);
// SEND bulk email
router.post("/notifications/send", sendNotification);

module.exports = router;

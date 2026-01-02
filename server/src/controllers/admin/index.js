const express = require("express");
const router = express.Router();

const {
  getStudents,
  updateStatus,
  updateFees,
  deleteStudent,
  updateStudent
} = require("../../api/admin/students-manamennt");

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

module.exports = router;

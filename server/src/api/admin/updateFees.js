const Student = require("../../models/Student");

// ===================== UPDATE FEES =====================
async function updateFees(req, res) {
  try {
    const { id } = req.params;
    const { total, paid } = req.body;

    const remaining = total - paid;

    await Student.findByIdAndUpdate(id, {
      fees: { total, paid, remaining }
    });

    res.json({
      success: true,
      message: "Fees Updated Successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = updateFees;

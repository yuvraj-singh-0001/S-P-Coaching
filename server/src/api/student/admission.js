const Student = require("../../models/Student");

async function admission(req, res) {
  try {
    const { name, email, phone, className, monthlyFee } = req.body;

    if (!name || !email || !phone || !className || !monthlyFee) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Student already admitted"
      });
    }

    const student = await Student.create({
      name,
      email,
      phone,
      className,
      fees: {
        monthlyFee
      }
    });

    res.json({ success: true, data: student });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = admission;

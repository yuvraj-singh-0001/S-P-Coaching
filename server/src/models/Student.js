const mongoose = require("mongoose");

// ================= FEES HISTORY =================
const feesHistorySchema = new mongoose.Schema(
  {
    fromMonth: String, // "2026-02"
    toMonth: String,   // "2026-03"
    amount: Number,
    paidAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

// ================= STUDENT SCHEMA =================
const studentSchema = new mongoose.Schema({
  // 🔗 LINK WITH USER
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  name: String,
  email: String,
  phone: String,
  className: String,

  admissionStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },

  admissionDate: {
    type: Date,
    default: Date.now
  },

  fees: {
    monthlyFee: {
      type: Number,
      default: 0
    },
    history: {
      type: [feesHistorySchema],
      default: []
    }
  }
});

module.exports = mongoose.model("Student", studentSchema);

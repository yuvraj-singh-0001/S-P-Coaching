const mongoose = require("mongoose");

const feesHistorySchema = new mongoose.Schema({
  fromMonth: String,     // "2026-02"
  toMonth: String,       // "2026-03"
  amount: Number,
  paidAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const studentSchema = new mongoose.Schema({
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

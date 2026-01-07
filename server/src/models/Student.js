const mongoose = require("mongoose");

const feesHistorySchema = new mongoose.Schema({
  month: {
    type: String, // e.g. "Jan 2026"
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  phone: {
    type: String,
    required: true
  },
  className: String,

  admissionStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  },

  fees: {
    total: {
      type: Number,
      default: 0
    },
    paid: {
      type: Number,
      default: 0
    },
    remaining: {
      type: Number,
      default: 0
    },
    history: {
      type: [feesHistorySchema],
      default: []
    }
  },

  admissionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Student", studentSchema);

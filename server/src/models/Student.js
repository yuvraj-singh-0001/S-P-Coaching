const mongoose = require("mongoose");

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
    }
  },

  admissionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Student", studentSchema);

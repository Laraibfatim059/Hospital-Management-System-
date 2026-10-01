const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  specialization: { type: String, required: true },
  qualifications: [{ type: String }],
  experienceYears: { type: Number },
  contactNumber: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  availability: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    startTime: { type: String }, // e.g., "09:00"
    endTime: { type: String }    // e.g., "17:00"
  }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  contactNumber: { type: String, required: true },
  address: { type: String },
  emergencyContact: {
    name: { type: String },
    relationship: { type: String },
    contactNumber: { type: String }
  },
  medicalHistory: [{ type: String }],
  allergies: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);

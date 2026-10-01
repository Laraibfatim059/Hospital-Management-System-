const mongoose = require('mongoose');

const labReportSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // requesting doctor
    required: true
  },
  labTestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LabTest',
    required: true
  },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  resultDetails: { type: String }, // Can be rich text or structured object
  conductedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff' // lab technician
  },
  conductedDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('LabReport', labReportSchema);

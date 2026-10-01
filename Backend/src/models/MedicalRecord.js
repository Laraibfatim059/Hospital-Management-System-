const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  vitals: {
    bloodPressure: { type: String },
    heartRate: { type: String },
    temperature: { type: String },
    weight: { type: String }
  },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatmentPlan: { type: String },
  doctorNotes: { type: String },
  followUpDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);

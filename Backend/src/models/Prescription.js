const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  medicalRecordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalRecord',
    required: true
  },
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
  medications: [{
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine'
    },
    medicineName: { type: String, required: true }, // fallback if not in inventory
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    duration: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  status: { type: String, enum: ['Pending', 'Dispensed'], default: 'Pending' },
  dispensedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff' // pharmacist
  },
  dispensedDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);

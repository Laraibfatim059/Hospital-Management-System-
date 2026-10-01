const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  admittingDoctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  bedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bed',
    required: true
  },
  admissionDate: { type: Date, required: true, default: Date.now },
  dischargeDate: { type: Date },
  status: { type: String, enum: ['Admitted', 'Discharged', 'Transferred'], default: 'Admitted' },
  reasonForAdmission: { type: String, required: true },
  dischargeSummary: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);

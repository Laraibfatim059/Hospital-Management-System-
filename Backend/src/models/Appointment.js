const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-show'], 
    default: 'Pending' 
  },
  reasonForVisit: { type: String, required: true },
  type: { type: String, enum: ['Consultation', 'Follow-up', 'Checkup', 'Emergency'], default: 'Consultation' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

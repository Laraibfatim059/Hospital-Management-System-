const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  status: { type: String, enum: ['Pending', 'Paid', 'Cancelled'], default: 'Pending' },
  totalAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  items: [{
    category: { type: String, enum: ['Consultation', 'Room/Bed', 'Laboratory', 'Pharmacy', 'Other'], required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    referenceId: { type: mongoose.Schema.Types.ObjectId } // Optional link to specific appointment/lab/prescription
  }]
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);

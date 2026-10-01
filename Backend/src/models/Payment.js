const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Credit Card', 'Insurance', 'Bank Transfer'], required: true },
  transactionId: { type: String }, // external ref
  paymentDate: { type: Date, default: Date.now },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff' // receptionist/admin
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);

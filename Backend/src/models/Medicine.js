const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  manufacturer: { type: String },
  unit: { type: String, enum: ['tablets', 'bottles', 'vials', 'capsules'], required: true },
  unitPrice: { type: Number, required: true },
  stockQuantity: { type: Number, required: true, default: 0 },
  minimumThreshold: { type: Number, required: true, default: 20 },
  expiryDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);

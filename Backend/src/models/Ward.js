const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., ICU, General Male
  type: { type: String, required: true },
  floor: { type: String, required: true },
  capacity: { type: Number, required: true }, // total beds
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Ward', wardSchema);

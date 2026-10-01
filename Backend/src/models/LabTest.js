const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // e.g., Hematology, Biochemistry
  cost: { type: Number, required: true },
  turnaroundTimeHours: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('LabTest', labTestSchema);

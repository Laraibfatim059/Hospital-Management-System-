const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  wardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ward',
    required: true
  },
  roomNumber: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Private', 'Semi-Private', 'General Ward'], required: true },
  pricePerDay: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);

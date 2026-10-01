const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  bedNumber: { type: String, required: true },
  status: { type: String, enum: ['Available', 'Occupied', 'Maintenance'], default: 'Available' },
  // Link to active admission if occupied
  currentAdmissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admission'
  }
}, { timestamps: true });

// Compound index to ensure bed numbers are unique per room
bedSchema.index({ roomId: 1, bedNumber: 1 }, { unique: true });

module.exports = mongoose.model('Bed', bedSchema);

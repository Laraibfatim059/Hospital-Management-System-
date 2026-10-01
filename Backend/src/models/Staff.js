const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['admin', 'nurse', 'receptionist', 'pharmacist', 'lab_technician'], 
    required: true 
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  contactNumber: { type: String, required: true },
  joiningDate: { type: Date, default: Date.now },
  shift: { type: String, enum: ['Morning', 'Evening', 'Night'] }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);

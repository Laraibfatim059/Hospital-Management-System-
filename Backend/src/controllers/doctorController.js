const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Private
exports.getDoctors = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Private
exports.getDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('departmentId', 'name');

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Create doctor & user account
// @route   POST /api/doctors
// @access  Private/Admin
exports.createDoctor = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, departmentId, specialization, contactNumber, consultationFee } = req.body;

    // 1. Create underlying User account
    const user = await User.create({
      email,
      password: password || 'Password123!', // Default password
      role: 'doctor'
    });

    // 2. Create Doctor profile
    const doctor = await Doctor.create({
      userId: user._id,
      firstName,
      lastName,
      departmentId,
      specialization,
      contactNumber,
      consultationFee
    });

    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    // If doctor creation fails, we should ideally rollback user creation, but keeping simple for phase 4
    next(error);
  }
};

// @desc    Update doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin
exports.updateDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Delete associated user
    await User.findByIdAndDelete(doctor.userId);
    
    await doctor.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

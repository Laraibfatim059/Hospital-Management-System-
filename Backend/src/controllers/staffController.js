const Staff = require('../models/Staff');
const User = require('../models/User');

// @desc    Get all staff
// @route   GET /api/staff
// @access  Private
exports.getAllStaff = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single staff member
// @route   GET /api/staff/:id
// @access  Private
exports.getStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id).populate('departmentId', 'name');

    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }

    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
};

// @desc    Create staff & user account
// @route   POST /api/staff
// @access  Private/Admin
exports.createStaff = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role, departmentId, contactNumber, shift } = req.body;

    // Validate role is for staff, not doctor/patient
    const validRoles = ['admin', 'nurse', 'receptionist', 'pharmacist', 'lab_technician'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid staff role provided' });
    }

    // 1. Create underlying User account
    const user = await User.create({
      email,
      password: password || 'Password123!', // Default password
      role
    });

    // 2. Create Staff profile
    const staff = await Staff.create({
      userId: user._id,
      firstName,
      lastName,
      role,
      departmentId,
      contactNumber,
      shift
    });

    res.status(201).json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
};

// @desc    Update staff
// @route   PUT /api/staff/:id
// @access  Private/Admin
exports.updateStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }

    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete staff
// @route   DELETE /api/staff/:id
// @access  Private/Admin
exports.deleteStaff = async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }

    // Delete associated user
    await User.findByIdAndDelete(staff.userId);
    
    await staff.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

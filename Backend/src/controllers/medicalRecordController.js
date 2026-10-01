const MedicalRecord = require('../models/MedicalRecord');

// @desc    Get all medical records
// @route   GET /api/medical-records
// @access  Private
exports.getMedicalRecords = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single medical record
// @route   GET /api/medical-records/:id
// @access  Private
exports.getMedicalRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patientId', 'firstName lastName dateOfBirth bloodGroup')
      .populate('doctorId', 'firstName lastName specialization');

    if (!record) {
      return res.status(404).json({ success: false, message: 'Medical Record not found' });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new medical record
// @route   POST /api/medical-records
// @access  Private/Doctor
exports.createMedicalRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.create(req.body);
    res.status(201).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

// @desc    Update medical record
// @route   PUT /api/medical-records/:id
// @access  Private/Doctor
exports.updateMedicalRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!record) {
      return res.status(404).json({ success: false, message: 'Medical Record not found' });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete medical record
// @route   DELETE /api/medical-records/:id
// @access  Private/Admin
exports.deleteMedicalRecord = async (req, res, next) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ success: false, message: 'Medical Record not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

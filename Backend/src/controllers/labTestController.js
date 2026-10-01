const LabTest = require('../models/LabTest');

// @desc    Get all lab tests
// @route   GET /api/lab-tests
// @access  Private
exports.getLabTests = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single lab test
// @route   GET /api/lab-tests/:id
// @access  Private
exports.getLabTest = async (req, res, next) => {
  try {
    const labTest = await LabTest.findById(req.params.id);

    if (!labTest) {
      return res.status(404).json({ success: false, message: 'Lab Test not found' });
    }

    res.status(200).json({ success: true, data: labTest });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new lab test
// @route   POST /api/lab-tests
// @access  Private/Lab Technician/Admin
exports.createLabTest = async (req, res, next) => {
  try {
    const labTest = await LabTest.create(req.body);
    res.status(201).json({ success: true, data: labTest });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lab test
// @route   PUT /api/lab-tests/:id
// @access  Private/Lab Technician/Admin
exports.updateLabTest = async (req, res, next) => {
  try {
    const labTest = await LabTest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!labTest) {
      return res.status(404).json({ success: false, message: 'Lab Test not found' });
    }

    res.status(200).json({ success: true, data: labTest });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete lab test
// @route   DELETE /api/lab-tests/:id
// @access  Private/Admin
exports.deleteLabTest = async (req, res, next) => {
  try {
    const labTest = await LabTest.findByIdAndDelete(req.params.id);

    if (!labTest) {
      return res.status(404).json({ success: false, message: 'Lab Test not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

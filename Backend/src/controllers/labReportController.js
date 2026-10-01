const LabReport = require('../models/LabReport');

// @desc    Get all lab reports
// @route   GET /api/lab-reports
// @access  Private
exports.getLabReports = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single lab report
// @route   GET /api/lab-reports/:id
// @access  Private
exports.getLabReport = async (req, res, next) => {
  try {
    const labReport = await LabReport.findById(req.params.id)
      .populate('patientId', 'firstName lastName dateOfBirth bloodGroup')
      .populate('doctorId', 'firstName lastName')
      .populate('labTestId', 'name category turnaroundTimeHours cost');

    if (!labReport) {
      return res.status(404).json({ success: false, message: 'Lab Report not found' });
    }

    res.status(200).json({ success: true, data: labReport });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new lab report (Order a test)
// @route   POST /api/lab-reports
// @access  Private/Doctor
exports.createLabReport = async (req, res, next) => {
  try {
    const labReport = await LabReport.create(req.body);
    res.status(201).json({ success: true, data: labReport });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lab report (Enter results)
// @route   PUT /api/lab-reports/:id
// @access  Private/Lab Technician/Doctor
exports.updateLabReport = async (req, res, next) => {
  try {
    const labReport = await LabReport.findById(req.params.id);

    if (!labReport) {
      return res.status(404).json({ success: false, message: 'Lab Report not found' });
    }

    // Logic for completing the report
    if (req.body.status === 'Completed' && labReport.status === 'Pending') {
      req.body.conductedDate = Date.now();
      // req.body.conductedBy = req.user.profileId; // In real app, bind to the tech entering the results
    }

    const updatedLabReport = await LabReport.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: updatedLabReport });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete lab report
// @route   DELETE /api/lab-reports/:id
// @access  Private/Admin
exports.deleteLabReport = async (req, res, next) => {
  try {
    const labReport = await LabReport.findByIdAndDelete(req.params.id);

    if (!labReport) {
      return res.status(404).json({ success: false, message: 'Lab Report not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

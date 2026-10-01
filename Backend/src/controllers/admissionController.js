const Admission = require('../models/Admission');
const Bed = require('../models/Bed');

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Private
exports.getAdmissions = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Admit a patient
// @route   POST /api/admissions
// @access  Private/Admin/Nurse/Doctor
exports.createAdmission = async (req, res, next) => {
  try {
    const { patientId, admittingDoctorId, bedId, reasonForAdmission } = req.body;

    // Check if bed is available
    const bed = await Bed.findById(bedId);
    if (!bed) {
      return res.status(404).json({ success: false, message: 'Bed not found' });
    }

    if (bed.status !== 'Available') {
      return res.status(400).json({ success: false, message: 'Bed is currently occupied or under maintenance' });
    }

    // Create admission
    const admission = await Admission.create({
      patientId,
      admittingDoctorId,
      bedId,
      reasonForAdmission
    });

    // Update Bed status to Occupied and link admission
    bed.status = 'Occupied';
    bed.currentAdmissionId = admission._id;
    await bed.save();

    res.status(201).json({ success: true, data: admission });
  } catch (error) {
    next(error);
  }
};

// @desc    Update admission (Discharge or Transfer)
// @route   PUT /api/admissions/:id
// @access  Private/Admin/Nurse/Doctor
exports.updateAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({ success: false, message: 'Admission not found' });
    }

    const previousStatus = admission.status;
    const newStatus = req.body.status;

    // Update admission document
    const updatedAdmission = await Admission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    // If discharging, free up the bed
    if (newStatus === 'Discharged' && previousStatus !== 'Discharged') {
      const bed = await Bed.findById(updatedAdmission.bedId);
      if (bed) {
        bed.status = 'Available';
        bed.currentAdmissionId = undefined;
        await bed.save();
      }
    }

    // Transferring logic would go here (free old bed, occupy new bed)

    res.status(200).json({ success: true, data: updatedAdmission });
  } catch (error) {
    next(error);
  }
};

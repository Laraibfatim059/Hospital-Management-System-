const Prescription = require('../models/Prescription');
const Medicine = require('../models/Medicine');

// @desc    Get all prescriptions
// @route   GET /api/prescriptions
// @access  Private
exports.getPrescriptions = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single prescription
// @route   GET /api/prescriptions/:id
// @access  Private
exports.getPrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('patientId', 'firstName lastName')
      .populate('doctorId', 'firstName lastName')
      .populate('medications.medicineId', 'name category unitPrice stockQuantity');

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    res.status(200).json({ success: true, data: prescription });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new prescription
// @route   POST /api/prescriptions
// @access  Private/Doctor
exports.createPrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.create(req.body);
    res.status(201).json({ success: true, data: prescription });
  } catch (error) {
    next(error);
  }
};

// @desc    Update prescription (e.g. mark as dispensed)
// @route   PUT /api/prescriptions/:id
// @access  Private/Pharmacist/Doctor
exports.updatePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    // Logic for dispensing
    if (req.body.status === 'Dispensed' && prescription.status === 'Pending') {
      // Loop through medications and reduce stock
      for (let med of prescription.medications) {
        if (med.medicineId) {
          const medicine = await Medicine.findById(med.medicineId);
          if (medicine) {
            // Check if enough stock
            if (medicine.stockQuantity < med.quantity) {
              return res.status(400).json({ 
                success: false, 
                message: `Insufficient stock for ${medicine.name}. Required: ${med.quantity}, Available: ${medicine.stockQuantity}` 
              });
            }
            medicine.stockQuantity -= med.quantity;
            await medicine.save();
          }
        }
      }
      
      // Add audit fields for dispensed
      req.body.dispensedDate = Date.now();
      // Assuming req.user is a pharmacist Staff profile, we'd ideally set dispensedBy to staff ID
      // req.body.dispensedBy = req.user.profileId; 
    }

    const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: updatedPrescription });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete prescription
// @route   DELETE /api/prescriptions/:id
// @access  Private/Admin
exports.deletePrescription = async (req, res, next) => {
  try {
    const prescription = await Prescription.findByIdAndDelete(req.params.id);

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

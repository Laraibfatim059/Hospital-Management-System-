const Medicine = require('../models/Medicine');

// @desc    Get all medicines
// @route   GET /api/medicines
// @access  Private
exports.getMedicines = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single medicine
// @route   GET /api/medicines/:id
// @access  Private
exports.getMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }

    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new medicine
// @route   POST /api/medicines
// @access  Private/Pharmacist/Admin
exports.createMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

// @desc    Update medicine (e.g. restock)
// @route   PUT /api/medicines/:id
// @access  Private/Pharmacist/Admin
exports.updateMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }

    res.status(200).json({ success: true, data: medicine });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete medicine
// @route   DELETE /api/medicines/:id
// @access  Private/Admin
exports.deleteMedicine = async (req, res, next) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Get pharmacy alerts (low stock & expiring)
// @route   GET /api/medicines/alerts
// @access  Private/Pharmacist/Admin
exports.getMedicineAlerts = async (req, res, next) => {
  try {
    // Low stock query: where stockQuantity is less than or equal to minimumThreshold
    const lowStock = await Medicine.find({
      $expr: { $lte: ['$stockQuantity', '$minimumThreshold'] }
    });

    // Expiring soon query: expiryDate within next 90 days
    const ninetyDaysFromNow = new Date();
    ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90);
    
    const expiringSoon = await Medicine.find({
      expiryDate: { $lte: ninetyDaysFromNow, $gt: new Date() } // Expiring within 90 days but not already expired
    });

    const expired = await Medicine.find({
      expiryDate: { $lte: new Date() }
    });

    res.status(200).json({
      success: true,
      data: {
        lowStock,
        expiringSoon,
        expired
      }
    });
  } catch (error) {
    next(error);
  }
};

const express = require('express');
const {
  getAdmissions,
  createAdmission,
  updateAdmission
} = require('../controllers/admissionController');

const Admission = require('../models/Admission');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'doctor', 'nurse', 'receptionist'), advancedResults(Admission, [{ path: 'patientId', select: 'firstName lastName' }, { path: 'bedId', populate: { path: 'roomId', select: 'roomNumber' } }]), getAdmissions)
  .post(authorize('admin', 'doctor', 'nurse', 'receptionist'), createAdmission);

router
  .route('/:id')
  .put(authorize('admin', 'doctor', 'nurse'), updateAdmission);

module.exports = router;

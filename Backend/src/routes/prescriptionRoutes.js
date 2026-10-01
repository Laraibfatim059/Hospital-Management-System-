const express = require('express');
const {
  getPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription,
  deletePrescription
} = require('../controllers/prescriptionController');

const Prescription = require('../models/Prescription');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'doctor', 'pharmacist', 'nurse', 'patient'), advancedResults(Prescription, [{ path: 'patientId', select: 'firstName lastName' }, { path: 'doctorId', select: 'firstName lastName' }]), getPrescriptions)
  .post(authorize('doctor', 'admin'), createPrescription);

router
  .route('/:id')
  .get(authorize('admin', 'doctor', 'pharmacist', 'nurse', 'patient'), getPrescription)
  .put(authorize('doctor', 'pharmacist', 'admin'), updatePrescription)
  .delete(authorize('admin'), deletePrescription);

module.exports = router;

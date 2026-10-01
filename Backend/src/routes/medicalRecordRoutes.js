const express = require('express');
const {
  getMedicalRecords,
  getMedicalRecord,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord
} = require('../controllers/medicalRecordController');

const MedicalRecord = require('../models/MedicalRecord');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'doctor', 'nurse', 'patient'), advancedResults(MedicalRecord, [{ path: 'patientId', select: 'firstName lastName' }, { path: 'doctorId', select: 'firstName lastName specialization' }]), getMedicalRecords)
  .post(authorize('doctor', 'admin'), createMedicalRecord);

router
  .route('/:id')
  .get(authorize('admin', 'doctor', 'nurse', 'patient'), getMedicalRecord)
  .put(authorize('doctor', 'admin'), updateMedicalRecord)
  .delete(authorize('admin'), deleteMedicalRecord);

module.exports = router;

const express = require('express');
const {
  getLabReports,
  getLabReport,
  createLabReport,
  updateLabReport,
  deleteLabReport
} = require('../controllers/labReportController');

const LabReport = require('../models/LabReport');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'lab_technician', 'doctor', 'patient'), advancedResults(LabReport, [{ path: 'patientId', select: 'firstName lastName' }, { path: 'doctorId', select: 'firstName lastName' }, { path: 'labTestId', select: 'name category' }]), getLabReports)
  .post(authorize('doctor', 'admin'), createLabReport);

router
  .route('/:id')
  .get(authorize('admin', 'lab_technician', 'doctor', 'patient'), getLabReport)
  .put(authorize('lab_technician', 'doctor', 'admin'), updateLabReport)
  .delete(authorize('admin'), deleteLabReport);

module.exports = router;

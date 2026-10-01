const express = require('express');
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientAppointments,
  getPatientHistory,
  getPatientPrescriptions,
  getPatientLabReports
} = require('../controllers/patientController');

const Patient = require('../models/Patient');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'doctor', 'nurse', 'receptionist'), advancedResults(Patient), getPatients)
  .post(authorize('admin', 'receptionist'), createPatient);

router
  .route('/:id')
  .get(authorize('admin', 'doctor', 'nurse', 'receptionist', 'patient'), getPatient)
  .put(authorize('admin', 'receptionist', 'doctor', 'nurse'), updatePatient)
  .delete(authorize('admin'), deletePatient);

// Aggregation endpoints (EMR)
router.get('/:id/appointments', authorize('admin', 'doctor', 'nurse', 'receptionist', 'patient'), getPatientAppointments);
router.get('/:id/history', authorize('admin', 'doctor', 'nurse', 'patient'), getPatientHistory);
router.get('/:id/prescriptions', authorize('admin', 'doctor', 'pharmacist', 'nurse', 'patient'), getPatientPrescriptions);
router.get('/:id/lab-reports', authorize('admin', 'doctor', 'lab_technician', 'nurse', 'patient'), getPatientLabReports);

module.exports = router;

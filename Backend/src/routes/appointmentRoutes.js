const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');

const Appointment = require('../models/Appointment');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route('/')
  .get(advancedResults(Appointment, [{ path: 'patientId', select: 'firstName lastName' }, { path: 'doctorId', select: 'firstName lastName specialization' }]), getAppointments)
  .post(authorize('admin', 'receptionist', 'patient'), createAppointment);

router
  .route('/:id')
  .get(getAppointment)
  .put(authorize('admin', 'receptionist', 'doctor', 'patient'), updateAppointment)
  .delete(authorize('admin'), deleteAppointment);

module.exports = router;

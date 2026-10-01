const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

const Doctor = require('../models/Doctor');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route('/')
  .get(advancedResults(Doctor, 'departmentId'), getDoctors)
  .post(authorize('admin'), createDoctor);

router
  .route('/:id')
  .get(getDoctor)
  .put(authorize('admin'), updateDoctor)
  .delete(authorize('admin'), deleteDoctor);

module.exports = router;

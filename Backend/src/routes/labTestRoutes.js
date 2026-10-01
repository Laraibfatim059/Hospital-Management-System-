const express = require('express');
const {
  getLabTests,
  getLabTest,
  createLabTest,
  updateLabTest,
  deleteLabTest
} = require('../controllers/labTestController');

const LabTest = require('../models/LabTest');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(authorize('admin', 'lab_technician', 'doctor', 'receptionist'), advancedResults(LabTest), getLabTests)
  .post(authorize('admin', 'lab_technician'), createLabTest);

router
  .route('/:id')
  .get(authorize('admin', 'lab_technician', 'doctor', 'receptionist'), getLabTest)
  .put(authorize('admin', 'lab_technician'), updateLabTest)
  .delete(authorize('admin'), deleteLabTest);

module.exports = router;

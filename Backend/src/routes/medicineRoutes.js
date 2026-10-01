const express = require('express');
const {
  getMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicineAlerts
} = require('../controllers/medicineController');

const Medicine = require('../models/Medicine');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/alerts', authorize('admin', 'pharmacist'), getMedicineAlerts);

router
  .route('/')
  .get(authorize('admin', 'pharmacist', 'doctor'), advancedResults(Medicine), getMedicines)
  .post(authorize('admin', 'pharmacist'), createMedicine);

router
  .route('/:id')
  .get(authorize('admin', 'pharmacist', 'doctor'), getMedicine)
  .put(authorize('admin', 'pharmacist'), updateMedicine)
  .delete(authorize('admin'), deleteMedicine);

module.exports = router;

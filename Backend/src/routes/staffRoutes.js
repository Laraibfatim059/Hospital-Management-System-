const express = require('express');
const {
  getAllStaff,
  getStaff,
  createStaff,
  updateStaff,
  deleteStaff
} = require('../controllers/staffController');

const Staff = require('../models/Staff');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route('/')
  .get(advancedResults(Staff, 'departmentId'), getAllStaff)
  .post(authorize('admin'), createStaff);

router
  .route('/:id')
  .get(getStaff)
  .put(authorize('admin'), updateStaff)
  .delete(authorize('admin'), deleteStaff);

module.exports = router;

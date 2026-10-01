const express = require('express');
const {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment
} = require('../controllers/departmentController');

const Department = require('../models/Department');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes are protected

router
  .route('/')
  .get(advancedResults(Department, { path: 'headOfDepartment', select: 'firstName lastName specialization' }), getDepartments)
  .post(authorize('admin'), createDepartment);

router
  .route('/:id')
  .get(getDepartment)
  .put(authorize('admin'), updateDepartment)
  .delete(authorize('admin'), deleteDepartment);

module.exports = router;

const express = require('express');
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  getPayments,
  processPayment
} = require('../controllers/billingController');

const Invoice = require('../models/Invoice');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// Invoice Routes
router
  .route('/invoices')
  .get(authorize('admin', 'receptionist', 'patient'), advancedResults(Invoice, 'patientId'), getInvoices)
  .post(authorize('admin', 'receptionist'), createInvoice);

router
  .route('/invoices/:id')
  .get(authorize('admin', 'receptionist', 'patient'), getInvoice)
  .put(authorize('admin', 'receptionist'), updateInvoice);

// Payment Routes
router
  .route('/payments')
  .get(authorize('admin', 'receptionist'), getPayments)
  .post(authorize('admin', 'receptionist'), processPayment);

module.exports = router;

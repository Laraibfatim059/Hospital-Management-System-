const Invoice = require('../models/Invoice');
const Payment = require('../models/Payment');

// =======================
// INVOICES
// =======================

// @desc    Get all invoices
// @route   GET /api/billing/invoices
// @access  Private
exports.getInvoices = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single invoice
// @route   GET /api/billing/invoices/:id
// @access  Private
exports.getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('patientId', 'firstName lastName contactNumber');

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new invoice
// @route   POST /api/billing/invoices
// @access  Private/Admin/Receptionist
exports.createInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

// @desc    Update invoice
// @route   PUT /api/billing/invoices/:id
// @access  Private/Admin/Receptionist
exports.updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

// =======================
// PAYMENTS
// =======================

// @desc    Get all payments
// @route   GET /api/billing/payments
// @access  Private
exports.getPayments = async (req, res, next) => {
  // Can reuse advancedResults but need a way to inject the model. 
  // We'll skip advancedResults for payments in this exact function just to keep it simple, 
  // or use a separate route configuration. We'll implement basic find for now.
  try {
    const payments = await Payment.find().populate('invoiceId').populate('patientId', 'firstName lastName');
    res.status(200).json({ success: true, count: payments.length, data: payments });
  } catch(error) {
    next(error);
  }
};

// @desc    Process a payment
// @route   POST /api/billing/payments
// @access  Private/Admin/Receptionist
exports.processPayment = async (req, res, next) => {
  try {
    const { invoiceId, patientId, amount, paymentMethod, transactionId } = req.body;

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    if (invoice.status === 'Paid') {
      return res.status(400).json({ success: false, message: 'Invoice is already paid' });
    }

    // Create payment
    const payment = await Payment.create({
      invoiceId,
      patientId,
      amount,
      paymentMethod,
      transactionId,
      // processedBy: req.user.profileId // In real app
    });

    // Update invoice status if amount covers total
    // In a real app, we'd sum all payments. For Phase 9, we assume full payment.
    if (amount >= invoice.totalAmount) {
      invoice.status = 'Paid';
      await invoice.save();
    }

    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
};

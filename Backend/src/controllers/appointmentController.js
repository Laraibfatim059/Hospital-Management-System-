const Appointment = require('../models/Appointment');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'firstName lastName contactNumber')
      .populate('doctorId', 'firstName lastName specialization');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res, next) => {
  try {
    const { doctorId, appointmentDate, timeSlot } = req.body;

    // Check for conflicting appointments
    const conflict = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate).setHours(0, 0, 0, 0), // normalize to start of day if needed
      timeSlot,
      status: { $in: ['Pending', 'Confirmed'] }
    });

    if (conflict) {
      return res.status(400).json({ 
        success: false, 
        message: 'This time slot is already booked for the selected doctor.' 
      });
    }

    const appointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // If changing time or doctor, check for conflicts again
    if (req.body.timeSlot || req.body.appointmentDate || req.body.doctorId) {
      const docId = req.body.doctorId || appointment.doctorId;
      const appDate = req.body.appointmentDate || appointment.appointmentDate;
      const tSlot = req.body.timeSlot || appointment.timeSlot;

      const conflict = await Appointment.findOne({
        _id: { $ne: appointment._id }, // Exclude current appointment
        doctorId: docId,
        appointmentDate: new Date(appDate).setHours(0, 0, 0, 0),
        timeSlot: tSlot,
        status: { $in: ['Pending', 'Confirmed'] }
      });

      if (conflict) {
        return res.status(400).json({ 
          success: false, 
          message: 'The requested time slot is already booked for the selected doctor.' 
        });
      }
    }

    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

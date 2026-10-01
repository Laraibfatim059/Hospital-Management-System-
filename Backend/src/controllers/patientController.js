const Patient = require('../models/Patient');
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const MedicalRecord = require('../models/MedicalRecord');
const Prescription = require('../models/Prescription');
const LabReport = require('../models/LabReport');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private (Admin, Doctor, Nurse, Receptionist)
exports.getPatients = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

// @desc    Get single patient
// @route   GET /api/patients/:id
// @access  Private
exports.getPatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Create patient
// @route   POST /api/patients
// @access  Private/Admin/Receptionist
exports.createPatient = async (req, res, next) => {
  try {
    const { 
      email, password, firstName, lastName, dateOfBirth, gender, 
      bloodGroup, contactNumber, address, emergencyContact, 
      medicalHistory, allergies 
    } = req.body;

    // 1. Create underlying User account for the patient
    const user = await User.create({
      email,
      password: password || 'Patient123!', // Default password
      role: 'patient'
    });

    // 2. Create Patient profile
    const patient = await Patient.create({
      userId: user._id,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      bloodGroup,
      contactNumber,
      address,
      emergencyContact,
      medicalHistory,
      allergies
    });

    res.status(201).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Update patient
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    res.status(200).json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete patient
// @route   DELETE /api/patients/:id
// @access  Private/Admin
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Delete associated user account
    await User.findByIdAndDelete(patient.userId);
    
    await patient.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// EMR Aggregation Endpoints
// ==========================================

// @desc    Get patient appointments
// @route   GET /api/patients/:id/appointments
// @access  Private
exports.getPatientAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.id })
      .populate('doctorId', 'firstName lastName specialization')
      .sort('-appointmentDate');
    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient medical history
// @route   GET /api/patients/:id/history
// @access  Private
exports.getPatientHistory = async (req, res, next) => {
  try {
    const history = await MedicalRecord.find({ patientId: req.params.id })
      .populate('doctorId', 'firstName lastName specialization')
      .sort('-createdAt');
    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient prescriptions
// @route   GET /api/patients/:id/prescriptions
// @access  Private
exports.getPatientPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.id })
      .populate('doctorId', 'firstName lastName')
      .populate('medications.medicineId', 'name category')
      .sort('-createdAt');
    res.status(200).json({ success: true, count: prescriptions.length, data: prescriptions });
  } catch (error) {
    next(error);
  }
};

// @desc    Get patient lab reports
// @route   GET /api/patients/:id/lab-reports
// @access  Private
exports.getPatientLabReports = async (req, res, next) => {
  try {
    const labReports = await LabReport.find({ patientId: req.params.id })
      .populate('doctorId', 'firstName lastName')
      .populate('labTestId', 'name category cost')
      .sort('-createdAt');
    res.status(200).json({ success: true, count: labReports.length, data: labReports });
  } catch (error) {
    next(error);
  }
};

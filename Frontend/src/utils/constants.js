/**
 * Application Constants
 * Shared enumeration, status definitions, pagination defaults, and styling mappings.
 */

export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  RECEPTIONIST: 'receptionist',
  PATIENT: 'patient',
  PHARMACIST: 'pharmacist',
  LAB_TECHNICIAN: 'lab_technician',
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
};

export const PATIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DISCHARGED: 'discharged',
  ADMITTED: 'admitted',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PARTIAL: 'partial',
  OVERDUE: 'overdue',
  REFUNDED: 'refunded',
};

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  PAGE_SIZES: [10, 25, 50, 100],
};

/**
 * Color classes mapped to appointment, patient, and payment statuses for badges and pills
 */
export const STATUS_COLORS = {
  // Appointment Statuses
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  confirmed: 'bg-teal-50 text-teal-700 border-teal-200',
  in_progress: 'bg-amber-50 text-amber-700 border-amber-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  no_show: 'bg-slate-100 text-slate-700 border-slate-200',

  // Patient Statuses
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  inactive: 'bg-slate-100 text-slate-700 border-slate-200',
  discharged: 'bg-blue-50 text-blue-700 border-blue-200',
  admitted: 'bg-amber-50 text-amber-700 border-amber-200',

  // Payment Statuses
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  partial: 'bg-sky-50 text-sky-700 border-sky-200',
  overdue: 'bg-red-50 text-red-700 border-red-200',
  refunded: 'bg-purple-50 text-purple-700 border-purple-200',
};

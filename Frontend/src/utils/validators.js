import { z } from 'zod';

/**
 * Schema for user login credentials
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
});

/**
 * Schema for password recovery request
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

/**
 * Schema for registering or editing patient details
 */
export const patientSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .trim()
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .trim()
    .min(2, 'Last name must be at least 2 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .trim()
    .min(10, 'Phone number must be at least 10 characters'),
  dateOfBirth: z
    .string({ required_error: 'Date of birth is required' })
    .trim()
    .min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Please select a valid gender',
  }),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional()
    .or(z.literal('')),
  address: z
    .string({ required_error: 'Address is required' })
    .trim()
    .min(5, 'Address must be at least 5 characters'),
});

/**
 * Schema for scheduling or updating an appointment
 */
export const appointmentSchema = z.object({
  patientId: z
    .string({ required_error: 'Patient is required' })
    .trim()
    .min(1, 'Patient is required'),
  doctorId: z
    .string({ required_error: 'Doctor is required' })
    .trim()
    .min(1, 'Doctor is required'),
  date: z
    .string({ required_error: 'Date is required' })
    .trim()
    .min(1, 'Date is required'),
  time: z
    .string({ required_error: 'Time is required' })
    .trim()
    .min(1, 'Time is required'),
  type: z
    .string({ required_error: 'Appointment type is required' })
    .trim()
    .min(1, 'Appointment type is required'),
  notes: z.string().trim().optional().or(z.literal('')),
});

/**
 * Schema for individual prescription medication item
 */
export const medicationItemSchema = z.object({
  name: z
    .string({ required_error: 'Medication name is required' })
    .trim()
    .min(1, 'Medication name is required'),
  dosage: z
    .string({ required_error: 'Dosage is required' })
    .trim()
    .min(1, 'Dosage is required'),
  frequency: z
    .string({ required_error: 'Frequency is required' })
    .trim()
    .min(1, 'Frequency is required'),
  duration: z
    .string({ required_error: 'Duration is required' })
    .trim()
    .min(1, 'Duration is required'),
});

/**
 * Schema for issuing a medical prescription
 */
export const prescriptionSchema = z.object({
  patientId: z
    .string({ required_error: 'Patient is required' })
    .trim()
    .min(1, 'Patient is required'),
  medications: z
    .array(medicationItemSchema)
    .min(1, 'At least one medication is required'),
});

/**
 * Schema for resetting password with token
 */
export const resetPasswordSchema = z.object({
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z
    .string({ required_error: 'Please confirm your password' })
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

/**
 * Schema for changing password internally
 */
export const changePasswordSchema = z.object({
  currentPassword: z
    .string({ required_error: 'Current password is required' })
    .min(1, 'Current password is required'),
  newPassword: z
    .string({ required_error: 'New password is required' })
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z
    .string({ required_error: 'Please confirm your new password' })
    .min(1, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

/**
 * Schema for managing hospital staff members
 */
export const staffSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  role: z.enum(['Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Admin', 'Other'], {
    required_error: 'Role is required',
  }),
  department: z.string().min(1, 'Department is required'),
  // Doctor specific fields (optional but validated if present)
  specialization: z.string().optional(),
  availability: z.string().optional(),
});

/**
 * Schema for managing departments
 */
export const departmentSchema = z.object({
  name: z.string().min(2, 'Department name is required'),
  headOfDepartment: z.string().min(2, 'Head of Department is required'),
  description: z.string().optional(),
  status: z.enum(['Active', 'Inactive']).default('Active'),
});

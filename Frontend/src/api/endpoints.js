/**
 * API route definitions organized by feature domain.
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  PATIENTS: {
    BASE: '/patients',
    BY_ID: (id) => `/patients/${id}`,
    SEARCH: '/patients/search',
  },
  DOCTORS: {
    BASE: '/doctors',
    BY_ID: (id) => `/doctors/${id}`,
    SCHEDULE: (id) => `/doctors/${id}/schedule`,
  },
  APPOINTMENTS: {
    BASE: '/appointments',
    BY_ID: (id) => `/appointments/${id}`,
    BY_DOCTOR: (id) => `/appointments/doctor/${id}`,
    BY_PATIENT: (id) => `/appointments/patient/${id}`,
  },
  DEPARTMENTS: {
    BASE: '/departments',
    BY_ID: (id) => `/departments/${id}`,
  },
  PRESCRIPTIONS: {
    BASE: '/prescriptions',
    BY_ID: (id) => `/prescriptions/${id}`,
    BY_PATIENT: (id) => `/prescriptions/patient/${id}`,
  },
  LAB_REPORTS: {
    BASE: '/lab-reports',
    BY_ID: (id) => `/lab-reports/${id}`,
    BY_PATIENT: (id) => `/lab-reports/patient/${id}`,
  },
  BILLING: {
    BASE: '/billing',
    BY_ID: (id) => `/billing/${id}`,
    BY_PATIENT: (id) => `/billing/patient/${id}`,
  },
  STAFF: {
    BASE: '/staff',
    BY_ID: (id) => `/staff/${id}`,
  },
  PHARMACY: {
    INVENTORY: '/pharmacy/inventory',
    DISPENSE: '/pharmacy/dispense',
  },
  DASHBOARD: {
    ADMIN: '/dashboard/admin',
    DOCTOR: '/dashboard/doctor',
    NURSE: '/dashboard/nurse',
  },
};

export default ENDPOINTS;

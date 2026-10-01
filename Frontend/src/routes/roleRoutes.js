import { ROLES } from '@/utils/constants';

/**
 * Route access configuration mapped by user roles.
 * Defines default landing path and permitted paths per role.
 */
export const roleRoutes = {
  [ROLES.ADMIN]: {
    defaultPath: '/admin',
    allowedPaths: [
      '/admin',
      '/admin/patients',
      '/admin/doctors',
      '/admin/staff',
      '/admin/appointments',
      '/admin/departments',
      '/admin/billing',
      '/admin/reports',
      '/admin/settings',
    ],
  },
  [ROLES.DOCTOR]: {
    defaultPath: '/doctor',
    allowedPaths: [
      '/doctor',
      '/doctor/patients',
      '/doctor/appointments',
      '/doctor/prescriptions',
      '/doctor/lab-reports',
      '/doctor/schedule',
    ],
  },
  [ROLES.NURSE]: {
    defaultPath: '/nurse',
    allowedPaths: [
      '/nurse',
      '/nurse/patients',
      '/nurse/vitals',
      '/nurse/wards',
      '/nurse/duty-roster',
    ],
  },
  [ROLES.RECEPTIONIST]: {
    defaultPath: '/receptionist',
    allowedPaths: [
      '/receptionist',
      '/receptionist/register',
      '/receptionist/appointments',
      '/receptionist/billing',
    ],
  },
  [ROLES.PATIENT]: {
    defaultPath: '/patient',
    allowedPaths: [
      '/patient',
      '/patient/appointments',
      '/patient/prescriptions',
      '/patient/lab-results',
      '/patient/bills',
      '/patient/profile',
    ],
  },
  [ROLES.PHARMACIST]: {
    defaultPath: '/pharmacist',
    allowedPaths: [
      '/pharmacist',
      '/pharmacist/prescriptions',
      '/pharmacist/inventory',
      '/pharmacist/dispensing',
    ],
  },
  [ROLES.LAB_TECHNICIAN]: {
    defaultPath: '/lab',
    allowedPaths: [
      '/lab',
      '/lab/orders',
      '/lab/results',
      '/lab/reports',
    ],
  },
};

/**
 * Returns the default dashboard path for a given user role.
 * @param {string} role - The role of the authenticated user.
 * @returns {string} The path to redirect to or '/login' if role is unmapped.
 */
export const getDefaultPath = (role) => roleRoutes[role]?.defaultPath || '/login';

/**
 * Checks whether a given path is accessible for a user's role.
 * @param {string} role - The role of the user.
 * @param {string} path - The target route path.
 * @returns {boolean} True if route is permitted, false otherwise.
 */
export const isPathAllowed = (role, path) => {
  const config = roleRoutes[role];
  if (!config) return false;
  return config.allowedPaths.some((p) => path.startsWith(p));
};

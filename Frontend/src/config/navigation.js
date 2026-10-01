/**
 * Sidebar Navigation Configuration
 * Maps each system role to its designated sidebar navigation menu items.
 *
 * Each item structure:
 * - label: display text for menu item
 * - path: route destination
 * - icon: Lucide icon component name
 * - children: optional sub-menu items
 */
export const navigationConfig = {
  admin: [
    { label: 'Dashboard', path: '/admin', icon: 'LayoutDashboard' },
    { label: 'Patients', path: '/admin/patients', icon: 'Users' },
    { label: 'Doctors', path: '/admin/doctors', icon: 'Stethoscope' },
    { label: 'Staff', path: '/admin/staff', icon: 'UserCog' },
    { label: 'Appointments', path: '/admin/appointments', icon: 'Calendar' },
    { label: 'Departments', path: '/admin/departments', icon: 'Building2' },
    { label: 'Billing', path: '/admin/billing', icon: 'Receipt' },
    { label: 'Reports', path: '/admin/reports', icon: 'BarChart3' },
    { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
  ],
  doctor: [
    { label: 'Dashboard', path: '/doctor', icon: 'LayoutDashboard' },
    { label: 'My Patients', path: '/doctor/patients', icon: 'Users' },
    { label: 'Appointments', path: '/doctor/appointments', icon: 'Calendar' },
    { label: 'Prescriptions', path: '/doctor/prescriptions', icon: 'Pill' },
    { label: 'Lab Reports', path: '/doctor/lab-reports', icon: 'FlaskConical' },
    { label: 'Schedule', path: '/doctor/schedule', icon: 'Clock' },
  ],
  nurse: [
    { label: 'Dashboard', path: '/nurse', icon: 'LayoutDashboard' },
    { label: 'Patients', path: '/nurse/patients', icon: 'Users' },
    { label: 'Vitals', path: '/nurse/vitals', icon: 'HeartPulse' },
    { label: 'Wards', path: '/nurse/wards', icon: 'BedDouble' },
    { label: 'Duty Roster', path: '/nurse/duty-roster', icon: 'Clock' },
  ],
  receptionist: [
    { label: 'Dashboard', path: '/receptionist', icon: 'LayoutDashboard' },
    { label: 'Patient Registration', path: '/receptionist/register', icon: 'UserPlus' },
    { label: 'Appointments', path: '/receptionist/appointments', icon: 'Calendar' },
    { label: 'Billing', path: '/receptionist/billing', icon: 'Receipt' },
  ],
  patient: [
    { label: 'Dashboard', path: '/patient', icon: 'LayoutDashboard' },
    { label: 'Appointments', path: '/patient/appointments', icon: 'Calendar' },
    { label: 'Prescriptions', path: '/patient/prescriptions', icon: 'Pill' },
    { label: 'Lab Results', path: '/patient/lab-results', icon: 'FlaskConical' },
    { label: 'Bills', path: '/patient/bills', icon: 'Receipt' },
    { label: 'Profile', path: '/patient/profile', icon: 'User' },
  ],
  pharmacist: [
    { label: 'Dashboard', path: '/pharmacist', icon: 'LayoutDashboard' },
    { label: 'Prescriptions', path: '/pharmacist/prescriptions', icon: 'ClipboardList' },
    { label: 'Inventory', path: '/pharmacist/inventory', icon: 'Package' },
    { label: 'Dispensing', path: '/pharmacist/dispensing', icon: 'Pill' },
  ],
  lab_technician: [
    { label: 'Dashboard', path: '/lab', icon: 'LayoutDashboard' },
    { label: 'Lab Orders', path: '/lab/orders', icon: 'ClipboardList' },
    { label: 'Test Results', path: '/lab/results', icon: 'FlaskConical' },
    { label: 'Reports', path: '/lab/reports', icon: 'FileText' },
  ],
};

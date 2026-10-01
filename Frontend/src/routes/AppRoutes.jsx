import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout, DashboardLayout } from '@/layouts';

// Route Guard
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Auth & Common Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';
import { NotFoundPage } from '@/pages/common/NotFoundPage';
import { UnauthorizedPage } from '@/pages/common/UnauthorizedPage';
import { SessionExpiredPage } from '@/pages/common/SessionExpiredPage';
import { ProfilePage } from '@/pages/common/ProfilePage';
import { ChangePasswordPage } from '@/pages/common/ChangePasswordPage';

// Patient Management Pages
import { PatientListPage } from '@/pages/patients/PatientListPage';
import { PatientDetailsPage } from '@/pages/patients/PatientDetailsPage';

// Staff & Department Pages
import { StaffListPage } from '@/pages/staff/StaffListPage';
import { DepartmentListPage } from '@/pages/departments/DepartmentListPage';

// Appointment Pages
import { AppointmentListPage } from '@/pages/appointments/AppointmentListPage';
import { AppointmentCalendarPage } from '@/pages/appointments/AppointmentCalendarPage';

// Clinical Pages
import { ConsultationPage } from '@/pages/clinical/ConsultationPage';

// Pharmacy Pages
import { InventoryPage } from '@/pages/pharmacy/InventoryPage';
import { PrescriptionDispensePage } from '@/pages/pharmacy/PrescriptionDispensePage';

// Laboratory Pages
import { TestCatalogPage } from '@/pages/laboratory/TestCatalogPage';
import { LabOrdersPage } from '@/pages/laboratory/LabOrdersPage';

// Billing & Wards
import { BillingDashboard } from '@/pages/billing/BillingDashboard';
import { WardManagementPage } from '@/pages/wards/WardManagementPage';

// Role Dashboard Pages
import {
  AdminDashboard,
  DoctorDashboard,
  NurseDashboard,
  ReceptionistDashboard,
  PatientDashboard,
  PharmacistDashboard,
  LabTechDashboard,
} from '@/pages/dashboard';

/**
 * Top-level application routing hierarchy.
 * Manages public auth routes, role-guarded dashboards, and fallback error pages.
 */
export function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Authentication Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Standalone Error Routes */}
      <Route path="/session-expired" element={<SessionExpiredPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="patients" element={<PatientListPage />} />
          <Route path="patients/:id" element={<PatientDetailsPage />} />
          <Route path="doctors" element={<StaffListPage defaultRole="Doctor" />} />
          <Route path="staff" element={<StaffListPage defaultRole="All" />} />
          <Route path="appointments" element={<AppointmentListPage />} />
          <Route path="departments" element={<DepartmentListPage />} />
          <Route path="billing" element={<BillingDashboard />} />
          <Route path="reports" element={<AdminDashboard />} />
          <Route path="settings" element={<ChangePasswordPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Doctor Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
        <Route path="/doctor" element={<DashboardLayout />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="consultation/:appointmentId" element={<ConsultationPage />} />
          <Route path="patients" element={<PatientListPage />} />
          <Route path="patients/:id" element={<PatientDetailsPage />} />
          <Route path="appointments" element={<AppointmentListPage />} />
          <Route path="prescriptions" element={<DoctorDashboard />} />
          <Route path="lab-reports" element={<DoctorDashboard />} />
          <Route path="schedule" element={<AppointmentCalendarPage />} />
          <Route path="settings" element={<ChangePasswordPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<DoctorDashboard />} />
        </Route>
      </Route>

      {/* Nurse Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['nurse']} />}>
        <Route path="/nurse" element={<DashboardLayout />}>
          <Route index element={<NurseDashboard />} />
          <Route path="patients" element={<PatientListPage />} />
          <Route path="patients/:id" element={<PatientDetailsPage />} />
          <Route path="vitals" element={<NurseDashboard />} />
          <Route path="wards" element={<WardManagementPage />} />
          <Route path="duty-roster" element={<NurseDashboard />} />
          <Route path="settings" element={<ChangePasswordPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NurseDashboard />} />
        </Route>
      </Route>

      {/* Receptionist Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['receptionist']} />}>
        <Route path="/receptionist" element={<DashboardLayout />}>
          <Route index element={<ReceptionistDashboard />} />
          <Route path="register" element={<PatientListPage />} />
          <Route path="patients" element={<PatientListPage />} />
          <Route path="patients/:id" element={<PatientDetailsPage />} />
          <Route path="appointments" element={<AppointmentListPage />} />
          <Route path="billing" element={<BillingDashboard />} />
          <Route path="settings" element={<ChangePasswordPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<ReceptionistDashboard />} />
        </Route>
      </Route>

      {/* Patient Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
        <Route path="/patient" element={<DashboardLayout />}>
          <Route index element={<PatientDashboard />} />
          <Route path="appointments" element={<AppointmentListPage />} />
          <Route path="prescriptions" element={<PatientDashboard />} />
          <Route path="lab-results" element={<PatientDashboard />} />
          <Route path="bills" element={<BillingDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<ChangePasswordPage />} />
          <Route path="*" element={<PatientDashboard />} />
        </Route>
      </Route>

      {/* Pharmacist Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['pharmacist']} />}>
        <Route path="/pharmacist" element={<DashboardLayout />}>
          <Route index element={<PharmacistDashboard />} />
          <Route path="prescriptions" element={<PrescriptionDispensePage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="dispensing" element={<PrescriptionDispensePage />} />
          <Route path="settings" element={<ChangePasswordPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<PharmacistDashboard />} />
        </Route>
      </Route>

      {/* Lab Technician Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['lab_technician']} />}>
        <Route path="/lab" element={<DashboardLayout />}>
          <Route index element={<LabTechDashboard />} />
          <Route path="orders" element={<LabOrdersPage />} />
          <Route path="results" element={<LabOrdersPage />} />
          <Route path="reports" element={<TestCatalogPage />} />
          <Route path="settings" element={<ChangePasswordPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<LabTechDashboard />} />
        </Route>
      </Route>

      {/* Generic authenticated fallback routes in case users navigate without role prefix */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<DashboardLayout />}>
          <Route index element={<ProfilePage />} />
        </Route>
        <Route path="/settings" element={<DashboardLayout />}>
          <Route index element={<ChangePasswordPage />} />
        </Route>
      </Route>

      {/* 404 Catch-All Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;

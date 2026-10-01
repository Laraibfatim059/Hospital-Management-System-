import { useAuthStore } from '@/store/useAuthStore';

/**
 * Convenience hook providing authentication state, actions, and derived role flags.
 *
 * @returns {{
 *   user: Object|null,
 *   token: string|null,
 *   role: string|null,
 *   isAuthenticated: boolean,
 *   login: (userData: Object) => void,
 *   logout: () => void,
 *   isAdmin: boolean,
 *   isDoctor: boolean,
 *   isNurse: boolean,
 *   isReceptionist: boolean,
 *   isPatient: boolean,
 *   isPharmacist: boolean,
 *   isLabTech: boolean
 * }}
 */
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const role = useAuthStore((state) => state.role);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const normalizedRole = role ? String(role).trim().toLowerCase() : '';

  const isAdmin = normalizedRole === 'admin';
  const isDoctor = normalizedRole === 'doctor';
  const isNurse = normalizedRole === 'nurse';
  const isReceptionist = normalizedRole === 'receptionist';
  const isPatient = normalizedRole === 'patient';
  const isPharmacist = normalizedRole === 'pharmacist';
  const isLabTech =
    normalizedRole === 'lab_tech' ||
    normalizedRole === 'labtech' ||
    normalizedRole === 'lab_technician' ||
    normalizedRole === 'labtechnician';

  return {
    user,
    token,
    role,
    isAuthenticated,
    login,
    logout,
    isAdmin,
    isDoctor,
    isNurse,
    isReceptionist,
    isPatient,
    isPharmacist,
    isLabTech,
  };
};

export default useAuth;

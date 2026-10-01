import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * Guard component that restricts access to authenticated users and authorized roles.
 *
 * @param {Object} props
 * @param {string[]} [props.allowedRoles] - Roles permitted to access the nested routes.
 * @returns {JSX.Element}
 */
export function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasRole = role && allowedRoles.includes(role);
    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;

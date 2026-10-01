import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/useAuthStore';
import { getDefaultPath } from '@/routes/roleRoutes';

/**
 * 403 Unauthorized error page displayed when authenticated user attempts
 * to access a route for which they do not have sufficient role permissions.
 */
export function UnauthorizedPage() {
  const navigate = useNavigate();
  const role = useAuthStore((state) => state.role);

  const handleGoToDashboard = () => {
    const defaultPath = getDefaultPath(role);
    navigate(defaultPath);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shadow-sm">
            <ShieldAlert className="h-10 w-10" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-slate-900">
            Access Denied
          </h1>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            You don't have permission to access this page.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Go Back
          </Button>

          <Button
            variant="primary"
            onClick={handleGoToDashboard}
            leftIcon={<LayoutDashboard className="h-4 w-4" />}
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;

import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function SessionExpiredPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleReturnToLogin = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <Card className="max-w-md w-full border-0 shadow-lg bg-white dark:bg-slate-800">
        <Card.Body className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-8 h-8 text-amber-600 dark:text-amber-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Session Expired
          </h1>
          
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Your session has expired due to inactivity or your token is no longer valid. Please log in again to continue using the application.
          </p>

          <Button
            onClick={handleReturnToLogin}
            variant="primary"
            className="w-full h-11"
          >
            Return to Login
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SessionExpiredPage;

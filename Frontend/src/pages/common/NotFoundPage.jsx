import { useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * 404 Not Found error page displayed when a user visits an unrecognized route.
 */
export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <span className="text-8xl sm:text-9xl font-extrabold text-slate-200 select-none tracking-widest block">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-400">
                <FileQuestion className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div>
          <Button
            variant="primary"
            onClick={() => navigate('/login')}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;

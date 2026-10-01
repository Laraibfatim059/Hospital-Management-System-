import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Eye, EyeOff, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

import { resetPasswordSchema } from '@/utils/validators';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async () => {
    try {
      if (!token) {
        toast.error('Invalid or missing reset token.');
        return;
      }
      
      // Mock API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Password has been reset successfully!');
      navigate('/login');
    } catch {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <Card.Header 
        className="text-center pb-6"
        title="Reset your password"
        description="Please enter your new password below."
      >
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <KeyRound className="w-6 h-6 text-blue-600" />
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="New Password"
            placeholder="••••••••"
            autoComplete="new-password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm New Password"
            placeholder="••••••••"
            autoComplete="new-password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full h-11"
              isLoading={isSubmitting}
            >
              Reset Password
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default ResetPasswordPage;

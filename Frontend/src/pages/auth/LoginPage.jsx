import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

import { loginSchema } from '@/utils/validators';
import { useAuthStore } from '@/store/useAuthStore';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';

/**
 * Login page allowing hospital personnel and patients to authenticate.
 */
export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      // Determine mock role based on email
      let role = 'admin';
      const emailLower = data.email.toLowerCase();
      if (emailLower.includes('doctor')) role = 'doctor';
      else if (emailLower.includes('nurse')) role = 'nurse';
      else if (emailLower.includes('receptionist')) role = 'receptionist';
      else if (emailLower.includes('patient')) role = 'patient';
      else if (emailLower.includes('pharmacist')) role = 'pharmacist';
      else if (emailLower.includes('lab')) role = 'lab_technician';

      // Mock login authentication
      login({
        user: { id: 1, name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`, email: data.email },
        token: 'mock-jwt-token',
        role: role,
      });

      toast.success('Signed in successfully!');
      
      // Navigate to respective dashboard
      const dashboardPath = `/${role === 'lab_technician' ? 'lab' : role}`;
      navigate(dashboardPath);
    } catch {
      toast.error('Failed to sign in. Please verify your credentials.');
    }
  };

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <Card.Body className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Email Address Field */}
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="name@hospital.com"
            autoComplete="email"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register('email')}
          />

          {/* Password Field with Show/Hide Toggle */}
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="••••••••"
            autoComplete="current-password"
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={errors.password?.message}
            {...register('password')}
          />

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between pt-1">
            <Checkbox
              id="remember"
              label="Remember me"
              {...register('remember')}
            />

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              className="w-full h-11"
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default LoginPage;

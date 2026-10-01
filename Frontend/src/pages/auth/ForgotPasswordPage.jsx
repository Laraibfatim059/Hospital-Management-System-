import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

import { forgotPasswordSchema } from '@/utils/validators';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

/**
 * Forgot password page allowing users to request a password reset email.
 */
export function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch {
      toast.error('Unable to send reset link. Please try again.');
    }
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    reset();
  };

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <Card.Body className="p-0">
        {isSubmitted ? (
          <div className="space-y-6">
            {/* Success Alert Banner */}
            <div
              role="alert"
              className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3"
            >
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold text-emerald-800">
                  Password reset link sent to your email
                </p>
                <p className="mt-1 text-emerald-700">
                  We've sent password reset instructions to{' '}
                  <span className="font-medium">{submittedEmail}</span>. Please check your inbox.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={handleResetForm}
              >
                Send to another email
              </Button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="text-center space-y-1 mb-2">
              <h2 className="text-lg font-semibold text-slate-900">Forgot Password?</h2>
              <p className="text-xs text-slate-500">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Email Field */}
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

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full h-11"
              isLoading={isSubmitting}
            >
              Send Reset Link
            </Button>

            {/* Back to Login Link */}
            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        )}
      </Card.Body>
    </Card>
  );
}

export default ForgotPasswordPage;

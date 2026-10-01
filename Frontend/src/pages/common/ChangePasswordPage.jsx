import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

import { changePasswordSchema } from '@/utils/validators';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function ChangePasswordPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async () => {
    try {
      // Mock API call to change password
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success('Your password has been successfully updated.');
      reset(); // clear form
    } catch {
      toast.error('Failed to change password. Please check your current password.');
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Security Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your account security and update your password.
        </p>
      </div>

      <Card>
        <Card.Header 
          title="Change Password" 
          description="Ensure your account is using a long, random password to stay secure."
        />
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <Input
              id="currentPassword"
              type={showCurrentPassword ? 'text' : 'password'}
              label="Current Password"
              placeholder="••••••••"
              autoComplete="current-password"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              error={errors.currentPassword?.message}
              {...register('currentPassword')}
            />

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800" />

            <Input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              label="New Password"
              placeholder="••••••••"
              autoComplete="new-password"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              error={errors.newPassword?.message}
              {...register('newPassword')}
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

            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
              >
                Update Password
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ChangePasswordPage;

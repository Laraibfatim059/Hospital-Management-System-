import { Outlet } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Authentication layout component used for authentication pages (Login, Forgot Password, etc.).
 * Centers an authentication card featuring hospital branding, an Outlet for form routes, and footer note.
 */
export function AuthLayout({ className }) {
  return (
    <div
      className={cn(
        'min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-100 flex flex-col items-center justify-center p-4',
        'dark:from-slate-950 dark:via-slate-900 dark:to-slate-950',
        className
      )}
    >
      {/* Centered Auth Card */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 transition-all">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 mb-4 ring-4 ring-blue-50 dark:ring-blue-950/50">
            <Stethoscope className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Hospital Management System
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
            Healthcare Management & Patient Portal
          </p>
        </div>

        {/* Content: Form routes via Outlet */}
        <div className="w-full">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Powered by HMS
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

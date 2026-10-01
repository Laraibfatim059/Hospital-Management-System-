import { Info, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Alert variant configurations mapping type to color styles and Lucide icon.
 */
const alertVariants = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    iconColor: 'text-blue-600',
    Icon: Info,
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    iconColor: 'text-emerald-600',
    Icon: CheckCircle2,
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 text-amber-800',
    iconColor: 'text-amber-600',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    iconColor: 'text-red-600',
    Icon: XCircle,
  },
};

/**
 * Reusable Alert component for displaying contextual feedback banners.
 *
 * @param {Object} props
 * @param {'info'|'success'|'warning'|'error'} [props.type='info'] - Visual style variant
 * @param {string} [props.title] - Optional alert title
 * @param {React.ReactNode} [props.children] - Alert message content
 * @param {boolean} [props.dismissible=false] - Whether dismiss button is shown
 * @param {Function} [props.onDismiss] - Callback triggered when dismiss button is clicked
 * @param {string} [props.className] - Additional class names
 */
function Alert({
  type = 'info',
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
  ...rest
}) {
  const variant = alertVariants[type] || alertVariants.info;
  const Icon = variant.Icon;

  return (
    <div
      role="alert"
      className={cn(
        'border rounded-lg p-4 flex gap-3',
        variant.container,
        className
      )}
      {...rest}
    >
      <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', variant.iconColor)} aria-hidden="true" />
      <div className="flex-1 text-sm">
        {title && (
          <h4 className="font-semibold mb-1 leading-snug">
            {title}
          </h4>
        )}
        {children && (
          <div className="leading-relaxed">
            {children}
          </div>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            'shrink-0 -mr-1 -mt-1 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer',
            variant.iconColor
          )}
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export { Alert };

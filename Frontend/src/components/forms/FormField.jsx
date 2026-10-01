import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Reusable FormField wrapper component for consistent form layouts,
 * labels with required indicator, helper descriptions, and validation error messages.
 *
 * @param {Object} props
 * @param {string} [props.label] - Field label text
 * @param {string} [props.name] - Field name used for label htmlFor attribute
 * @param {string|Object} [props.error] - Validation error message or react-hook-form error object
 * @param {boolean} [props.required=false] - Whether the field is mandatory (appends red asterisk)
 * @param {React.ReactNode} props.children - Input or control element
 * @param {string} [props.className] - Additional class names for container
 * @param {string} [props.helpText] - Informational helper text below input
 */
function FormField({
  label,
  name,
  error,
  required = false,
  children,
  className,
  helpText,
}) {
  const errorMessage =
    typeof error === 'object' && error !== null
      ? error.message
      : typeof error === 'string'
      ? error
      : null;

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {children}

      {helpText && !errorMessage && (
        <p className="text-xs text-slate-500">{helpText}</p>
      )}

      {errorMessage && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} className="shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
}

export { FormField };

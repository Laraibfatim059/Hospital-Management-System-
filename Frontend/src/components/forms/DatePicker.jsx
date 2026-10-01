import { forwardRef, useId } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Reusable DatePicker component styled consistently with standard form inputs.
 * Wraps a native date input with label, validation error feedback, and min/max constraints.
 *
 * @param {Object} props
 * @param {string} [props.label] - Field label text
 * @param {string|Object} [props.error] - Validation error message or react-hook-form error object
 * @param {string} [props.min] - Minimum selectable date in YYYY-MM-DD format
 * @param {string} [props.max] - Maximum selectable date in YYYY-MM-DD format
 * @param {string} [props.className] - Additional classes for the date input
 * @param {string} [props.id] - Optional ID for the date input
 * @param {boolean} [props.required=false] - Whether the field is required
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 */
const DatePicker = forwardRef(
  (
    {
      label,
      error,
      min,
      max,
      className,
      id,
      required = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || (rest.name ? `datepicker-${rest.name}` : generatedId);
    const errorMessage =
      typeof error === 'object' && error !== null
        ? error.message
        : typeof error === 'string'
        ? error
        : null;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type="date"
          id={inputId}
          min={min}
          max={max}
          disabled={disabled}
          className={cn(
            'w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 transition-colors',
            errorMessage && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            className
          )}
          {...rest}
        />
        {errorMessage && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <AlertCircle size={12} className="shrink-0" />
            <span>{errorMessage}</span>
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };

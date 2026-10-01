import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Reusable Checkbox component supporting label text, helper/error text, and custom styling.
 */
const Checkbox = forwardRef(
  (
    {
      label,
      description,
      error,
      className,
      id,
      disabled,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || (rest.name ? `checkbox-${rest.name}` : generatedId);

    return (
      <div className="flex flex-col">
        <label
          htmlFor={checkboxId}
          className={cn(
            'inline-flex items-start gap-2.5 cursor-pointer select-none',
            disabled && 'cursor-not-allowed opacity-60'
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            className={cn(
              'h-4 w-4 mt-0.5 rounded border border-slate-300 text-blue-600 accent-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-white disabled:cursor-not-allowed transition-colors cursor-pointer',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
            {...rest}
          />
          {(label || description) && (
            <div className="flex flex-col text-sm">
              {label && (
                <span className="font-medium text-slate-800 leading-tight">
                  {label}
                </span>
              )}
              {description && (
                <span className="text-slate-500 text-xs mt-0.5">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
        {error && <p className="text-red-500 text-xs mt-1 ml-6.5">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };

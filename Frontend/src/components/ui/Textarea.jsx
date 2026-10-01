import { forwardRef, useId } from 'react';
import { cn } from '@/utils/cn';

/**
 * Reusable multi-line Textarea component supporting labels, customizable rows, and error states.
 */
const Textarea = forwardRef(
  (
    {
      label,
      error,
      className,
      rows = 4,
      id,
      disabled,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || (rest.name ? `textarea-${rest.name}` : generatedId);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          disabled={disabled}
          className={cn(
            'w-full p-3 rounded-lg border border-slate-300 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 transition-colors resize-y',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            className
          )}
          {...rest}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };

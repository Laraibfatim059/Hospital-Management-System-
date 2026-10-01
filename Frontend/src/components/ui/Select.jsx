import { forwardRef, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Reusable Select dropdown component supporting labels, options array or children, and error states.
 */
const Select = forwardRef(
  (
    {
      label,
      error,
      options = [],
      placeholder,
      className,
      id,
      disabled,
      children,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id || (rest.name ? `select-${rest.name}` : generatedId);

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={cn(
              'w-full h-10 pl-3 pr-10 rounded-lg border border-slate-300 bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100 disabled:cursor-not-allowed text-slate-900 transition-colors cursor-pointer',
              error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
              className
            )}
            {...rest}
          >
            {placeholder && (
              <option value="">
                {placeholder}
              </option>
            )}
            {options.map((option) => {
              const value = typeof option === 'object' && option !== null ? option.value : option;
              const labelText = typeof option === 'object' && option !== null ? option.label : option;
              return (
                <option key={String(value)} value={value}>
                  {labelText}
                </option>
              );
            })}
            {children}
          </select>
          <ChevronDown className="h-4 w-4 text-slate-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };

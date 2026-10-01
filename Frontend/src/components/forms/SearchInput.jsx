import { forwardRef, useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Reusable SearchInput component with internal debounced state,
 * left search icon, and an optional clear button on the right.
 *
 * @param {Object} props
 * @param {string} [props.value=''] - Search input value
 * @param {Function} props.onChange - Debounced callback invoked with updated search string
 * @param {string} [props.placeholder='Search...'] - Input placeholder text
 * @param {Function} [props.onClear] - Optional callback triggered when clear button is clicked
 * @param {string} [props.className] - Additional class names for the input
 * @param {number} [props.debounceMs=300] - Debounce delay in milliseconds
 */
const SearchInput = forwardRef(
  (
    {
      value = '',
      onChange,
      placeholder = 'Search...',
      onClear,
      className,
      debounceMs = 300,
      ...rest
    },
    ref
  ) => {
    const [searchTerm, setSearchTerm] = useState(value ?? '');

    const [prevValue, setPrevValue] = useState(value);
    if (value !== prevValue) {
      setPrevValue(value);
      setSearchTerm(value ?? '');
    }

    // Debounce calling onChange
    useEffect(() => {
      const timer = setTimeout(() => {
        if (searchTerm !== (value ?? '')) {
          onChange?.(searchTerm);
        }
      }, debounceMs);

      return () => {
        clearTimeout(timer);
      };
    }, [searchTerm, debounceMs, onChange, value]);

    const handleClear = () => {
      setSearchTerm('');
      onClear?.();
      onChange?.('');
    };

    return (
      <div className="relative w-full">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 pointer-events-none">
          <Search className="h-4 w-4" />
        </div>
        <input
          ref={ref}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full h-10 pl-10 pr-10 rounded-lg border border-slate-300 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 transition-colors',
            className
          )}
          {...rest}
        />
        {Boolean(searchTerm) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-md transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };

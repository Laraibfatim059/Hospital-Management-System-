import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Size mapping for Spinner dimensions.
 */
const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

/**
 * Reusable Spinner component using Lucide Loader2 icon.
 *
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Spinner size
 * @param {string} [props.className] - Additional class names
 */
function Spinner({ size = 'md', className, ...rest }) {
  return (
    <Loader2
      className={cn(
        'animate-spin text-blue-600',
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      role="status"
      aria-label="Loading"
      {...rest}
    />
  );
}

export { Spinner };

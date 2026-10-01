import { useState } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Size styling maps for the Avatar component.
 */
const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const iconSizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

/**
 * Generates up to 2 uppercase initials from a person's name.
 *
 * @param {string} [name]
 * @returns {string}
 */
function getInitials(name) {
  if (!name || typeof name !== 'string') return '';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Reusable Avatar component supporting image source with fallback to name initials or user icon.
 */
function Avatar({
  src,
  alt = '',
  name = '',
  size = 'md',
  className,
  ...rest
}) {
  const [hasError, setHasError] = useState(false);
  const initials = getInitials(name);
  const showImage = Boolean(src && !hasError);

  return (
    <div
      className={cn(
        'rounded-full inline-flex items-center justify-center font-medium overflow-hidden select-none shrink-0',
        !showImage && 'bg-blue-600 text-white',
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <User className={iconSizes[size] || iconSizes.md} />
      )}
    </div>
  );
}

export { Avatar };

import { cn } from '@/utils/cn';

/**
 * Styling mappings for Badge component variants.
 */
const variantClasses = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-100 text-emerald-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

/**
 * Sizing mappings for Badge component.
 */
const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
};

/**
 * Reusable Badge status and tag component.
 */
function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
  ...rest
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export { Badge };

import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

/**
 * Reusable EmptyState component for empty lists, search misses, or pending actions.
 *
 * @param {Object} props
 * @param {React.ElementType} [props.icon] - Lucide icon component to display
 * @param {string} [props.title] - Main heading text
 * @param {string} [props.description] - Subtitle description text
 * @param {string} [props.actionLabel] - Label for the call-to-action button
 * @param {Function} [props.onAction] - Click handler for the action button
 * @param {string} [props.className] - Additional class names
 * @param {React.ReactNode} [props.children] - Optional custom children
 */
function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  children,
  ...rest
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
      {...rest}
    >
      {Icon && (
        typeof Icon === 'function' ? (
          <Icon className="h-12 w-12 text-slate-400 mb-4" aria-hidden="true" />
        ) : (
          <div className="mb-4 text-slate-400">{Icon}</div>
        )
      )}

      {title && (
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-sm text-slate-500 mb-6 max-w-sm">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <Button onClick={onAction}>
          {actionLabel}
        </Button>
      )}

      {children}
    </div>
  );
}

export { EmptyState };

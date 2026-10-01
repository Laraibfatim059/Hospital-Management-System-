import { cn } from '@/utils/cn';

/**
 * Variant styles for the Card component.
 */
const variantClasses = {
  default: 'border border-slate-200 shadow-sm',
  bordered: 'border-2 border-slate-200 shadow-sm',
  elevated: 'border border-slate-200 shadow-md',
};

/**
 * Card Header subcomponent supporting title, description, and optional right-aligned action children.
 */
function CardHeader({ title, description, children, className, ...rest }) {
  return (
    <div
      className={cn('px-6 py-4 border-b border-slate-200', className)}
      {...rest}
    >
      {title || description ? (
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-sm text-slate-500">{description}</p>
            )}
          </div>
          {children && <div>{children}</div>}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Card Body subcomponent providing consistent padding for card content.
 */
function CardBody({ children, className, ...rest }) {
  return (
    <div className={cn('px-6 py-4', className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * Card Footer subcomponent with top border and subtle background fill.
 */
function CardFooter({ children, className, ...rest }) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-slate-200 bg-slate-50', className)}
      {...rest}
    >
      {children}
    </div>
  );
}

/**
 * Main Card container component supporting default, bordered, and elevated variants.
 */
function Card({
  variant = 'default',
  children,
  className,
  ...rest
}) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white overflow-hidden',
        variantClasses[variant] || variantClasses.default,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card, CardHeader, CardBody, CardFooter };
export default Card;


import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Full page overlay loader with large spinner and optional status text.
 *
 * @param {Object} props
 * @param {string} [props.text='Loading...'] - Status text shown below spinner
 * @param {string} [props.className] - Additional class names
 */
function PageLoader({ text = 'Loading...', className }) {
  return (
    <div
      className={cn(
        'fixed inset-0 bg-white/80 backdrop-blur-xs z-50 flex flex-col items-center justify-center gap-3',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      {text && (
        <p className="text-sm font-medium text-slate-600">{text}</p>
      )}
    </div>
  );
}

/**
 * Inline loading indicator with small spinner and text.
 *
 * @param {Object} props
 * @param {string} [props.text='Loading...'] - Status text shown beside spinner
 * @param {string} [props.className] - Additional class names
 */
function InlineLoader({ text = 'Loading...', className }) {
  return (
    <div
      className={cn('inline-flex items-center gap-2 text-sm text-slate-600', className)}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-4 w-4 animate-spin text-blue-600 shrink-0" />
      {text && <span>{text}</span>}
    </div>
  );
}

/**
 * Skeleton placeholder with shimmer pulse animation.
 *
 * @param {Object} props
 * @param {'text'|'circular'|'rectangular'} [props.variant='text'] - Shape of the skeleton placeholder
 * @param {number|string} [props.width] - Optional width (px or CSS string)
 * @param {number|string} [props.height] - Optional height (px or CSS string)
 * @param {string} [props.className] - Additional class names
 * @param {Object} [props.style] - Inline styles
 */
function Skeleton({
  variant = 'text',
  width,
  height,
  className,
  style,
  ...props
}) {
  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full h-10 w-10 shrink-0',
    rectangular: 'rounded-lg h-24 w-full',
  };

  const inlineStyle = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
    ...style,
  };

  return (
    <div
      className={cn(
        'bg-slate-200 animate-pulse',
        variantClasses[variant] || variantClasses.text,
        className
      )}
      style={inlineStyle}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * CardSkeleton that mimics standard Card component structure with header and 3 lines.
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional class names
 */
function CardSkeleton({ className }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm',
        className
      )}
      aria-hidden="true"
    >
      <Skeleton className="h-6 w-1/3" />
      <div className="space-y-2.5 pt-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

/**
 * TableSkeleton that mimics table rows and columns.
 *
 * @param {Object} props
 * @param {number} [props.rows=5] - Number of placeholder rows
 * @param {number} [props.columns=4] - Number of placeholder columns
 * @param {string} [props.className] - Additional class names
 */
function TableSkeleton({ rows = 5, columns = 4, className }) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm',
        className
      )}
      aria-hidden="true"
    >
      {/* Table Header skeleton */}
      <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3.5">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={`head-${i}`} className="h-4 flex-1" />
        ))}
      </div>
      {/* Table Rows skeleton */}
      <div className="divide-y divide-slate-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex items-center gap-4 px-6 py-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={`cell-${rowIndex}-${colIndex}`}
                className={cn('h-4 flex-1', colIndex === 0 ? 'max-w-[140px]' : '')}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export { PageLoader, InlineLoader, Skeleton, CardSkeleton, TableSkeleton };

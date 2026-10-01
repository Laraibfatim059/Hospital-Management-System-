import { useState } from 'react';
import { cn } from '@/utils/cn';

/**
 * Position mappings for Tooltip container.
 */
const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/**
 * Arrow position and rotation classes.
 */
const arrowClasses = {
  top: 'bottom-[-3px] left-1/2 -translate-x-1/2',
  bottom: 'top-[-3px] left-1/2 -translate-x-1/2',
  left: 'right-[-3px] top-1/2 -translate-y-1/2',
  right: 'left-[-3px] top-1/2 -translate-y-1/2',
};

/**
 * Reusable Tooltip component displaying informational text on hover or focus.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.content - Tooltip text or node to display
 * @param {'top'|'bottom'|'left'|'right'} [props.position='top'] - Placement direction
 * @param {React.ReactNode} props.children - Target element that triggers the tooltip
 * @param {string} [props.className] - Additional class names for tooltip popup
 */
function Tooltip({
  content,
  position = 'top',
  children,
  className,
}) {
  const [isVisible, setIsVisible] = useState(false);

  if (!content) return children;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            'absolute bg-slate-900 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-50 shadow-md pointer-events-none transition-opacity duration-150',
            positionClasses[position] || positionClasses.top,
            className
          )}
        >
          {content}
          <div
            className={cn(
              'absolute w-1.5 h-1.5 bg-slate-900 rotate-45',
              arrowClasses[position] || arrowClasses.top
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </span>
  );
}

export { Tooltip };

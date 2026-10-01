import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Size mapping for Modal maximum width classes.
 */
const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

/**
 * Reusable dialog/modal component with backdrop, keyboard support, and scroll lock.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility of the modal
 * @param {Function} props.onClose - Callback triggered when backdrop or close button is clicked or Escape pressed
 * @param {string} [props.title] - Modal title in the header
 * @param {'sm'|'md'|'lg'|'xl'|'full'} [props.size='md'] - Max width size of the modal panel
 * @param {React.ReactNode} props.children - Modal body content
 * @param {string} [props.className] - Additional class names for the modal panel
 * @param {boolean} [props.showCloseButton=true] - Whether to show the top-right X button
 * @param {React.ReactNode} [props.footer] - Optional footer content
 */
function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  className,
  showCloseButton = true,
  footer,
}) {
  // Handle Escape key and prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={cn(
          'bg-white rounded-xl shadow-xl w-full max-h-[85vh] overflow-hidden flex flex-col',
          sizeClasses[size] || sizeClasses.md,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
            {title ? (
              <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
                {title}
              </h2>
            ) : (
              <span />
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * ModalBody component for flexible nested composition.
 */
function ModalBody({ children, className }) {
  return (
    <div className={cn('px-6 py-4 overflow-y-auto flex-1', className)}>
      {children}
    </div>
  );
}

/**
 * ModalFooter component for actions with standard styling.
 */
function ModalFooter({ children, className }) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 shrink-0',
        className
      )}
    >
      {children}
    </div>
  );
}

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export { Modal, ModalBody, ModalFooter };

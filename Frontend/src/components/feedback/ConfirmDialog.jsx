import { AlertTriangle, Info } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

/**
 * Visual configuration mapping for confirmation dialog variants.
 */
const variantConfig = {
  danger: {
    icon: AlertTriangle,
    circleClass: 'bg-red-100 text-red-600',
    buttonVariant: 'danger',
    buttonClass: '',
  },
  warning: {
    icon: AlertTriangle,
    circleClass: 'bg-amber-100 text-amber-600',
    buttonVariant: 'primary',
    buttonClass: 'bg-amber-500 hover:bg-amber-600 text-white focus-visible:ring-amber-500',
  },
  info: {
    icon: Info,
    circleClass: 'bg-blue-100 text-blue-600',
    buttonVariant: 'primary',
    buttonClass: '',
  },
};

/**
 * Reusable ConfirmDialog component for destructive or critical confirmation workflows.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Callback triggered on cancel or modal dismiss
 * @param {Function} props.onConfirm - Callback triggered when confirm button is clicked
 * @param {string} [props.title='Confirm Action'] - Dialog header title
 * @param {string} [props.message='Are you sure you want to proceed?'] - Confirmation message body
 * @param {string} [props.confirmText='Confirm'] - Confirm action button label
 * @param {string} [props.cancelText='Cancel'] - Cancel action button label
 * @param {'danger'|'warning'|'info'} [props.variant='danger'] - Visual style variant
 * @param {boolean} [props.isLoading=false] - Whether confirmation action is pending
 */
function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) {
  const config = variantConfig[variant] || variantConfig.danger;
  const IconComponent = config.icon;

  const footer = (
    <div className="flex items-center justify-end gap-3 w-full">
      <Button
        variant="outline"
        onClick={onClose}
        disabled={isLoading}
      >
        {cancelText}
      </Button>
      <Button
        variant={config.buttonVariant}
        className={config.buttonClass}
        onClick={onConfirm}
        isLoading={isLoading}
      >
        {confirmText}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? undefined : onClose}
      size="sm"
      showCloseButton={!isLoading}
      footer={footer}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
            config.circleClass
          )}
        >
          <IconComponent className="h-5 w-5" />
        </div>
        <div className="space-y-1 pt-0.5">
          <h3 className="text-base font-semibold text-slate-900 leading-snug">
            {title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export { ConfirmDialog };

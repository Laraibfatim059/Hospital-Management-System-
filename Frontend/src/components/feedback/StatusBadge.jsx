import { Badge } from '@/components/ui/Badge';

/**
 * Mapping of status strings to semantic Badge variants.
 */
const statusVariantMap = {
  // Success
  active: 'success',
  completed: 'success',
  paid: 'success',
  confirmed: 'success',

  // Info
  scheduled: 'info',
  in_progress: 'info',
  partial: 'info',
  admitted: 'info',

  // Warning
  pending: 'warning',
  no_show: 'warning',

  // Danger
  cancelled: 'danger',
  inactive: 'danger',
  overdue: 'danger',
  discharged: 'danger',
};

/**
 * Formats a raw status string into human-readable label:
 * Capitalizes the first letter and replaces underscores with spaces.
 *
 * @param {string} status
 * @returns {string}
 */
function formatStatus(status) {
  if (!status || typeof status !== 'string') return '';
  const text = status.replace(/_/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Reusable StatusBadge component that converts application status values
 * into consistently styled and formatted badge indicators.
 *
 * @param {Object} props
 * @param {string} props.status - Status string identifier (e.g. 'in_progress', 'completed')
 * @param {string} [props.className] - Additional class names
 */
function StatusBadge({ status, className, ...rest }) {
  const normalizedKey =
    typeof status === 'string' ? status.toLowerCase().trim() : '';
  const variant = statusVariantMap[normalizedKey] || 'default';
  const label = formatStatus(status);

  return (
    <Badge variant={variant} className={className} {...rest}>
      {label}
    </Badge>
  );
}

export { StatusBadge };

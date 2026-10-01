import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';
import { cn } from '@/utils/cn';

/**
 * Reusable action button group for table rows.
 * Provides View, Edit, and Delete action buttons with tooltips and hover state styling.
 *
 * @param {Object} props
 * @param {Function} [props.onView] - Click callback for View button
 * @param {Function} [props.onEdit] - Click callback for Edit button
 * @param {Function} [props.onDelete] - Click callback for Delete button
 * @param {string} [props.className] - Additional class names for wrapper container
 */
function TableActions({ onView, onEdit, onDelete, className }) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {onView && (
        <Tooltip content="View">
          <button
            type="button"
            onClick={onView}
            className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="View record"
          >
            <Eye className="h-4 w-4" />
          </button>
        </Tooltip>
      )}

      {onEdit && (
        <Tooltip content="Edit">
          <button
            type="button"
            onClick={onEdit}
            className="text-slate-600 hover:text-amber-600 hover:bg-amber-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Edit record"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </Tooltip>
      )}

      {onDelete && (
        <Tooltip content="Delete">
          <button
            type="button"
            onClick={onDelete}
            className="text-slate-600 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Delete record"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </Tooltip>
      )}
    </div>
  );
}

export { TableActions };

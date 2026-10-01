import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { TableSkeleton } from '@/components/ui/Loading';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { cn } from '@/utils/cn';

/**
 * Reusable DataTable component powered by TanStack Table.
 * Features sorting, pagination, empty state, loading skeleton, and card container.
 *
 * @param {Object} props
 * @param {Array} props.columns - TanStack Table column definitions
 * @param {Array} [props.data=[]] - Dataset array
 * @param {boolean} [props.isLoading=false] - Whether data is actively loading
 * @param {string} [props.emptyMessage='No data found'] - Text for empty state
 * @param {React.ReactNode|React.ElementType} [props.emptyIcon] - Icon for empty state
 * @param {Object} [props.pagination] - Pagination options
 * @param {number} [props.pagination.pageIndex] - 0-indexed active page
 * @param {number} [props.pagination.pageSize] - Number of rows per page
 * @param {number} [props.pagination.pageCount] - Total page count for server-side pagination
 * @param {Function} [props.pagination.onPageChange] - Page change callback
 * @param {Function} [props.pagination.onPageSizeChange] - Page size change callback
 * @param {number} [props.pagination.totalItems] - Total number of items
 * @param {Object} [props.sorting] - Sorting configuration
 * @param {Array|Object|string} [props.sorting.sortBy] - Active sorting state
 * @param {Function} [props.sorting.onSortChange] - Sort change callback
 * @param {string} [props.className] - Additional class names for Card container
 */
function DataTable({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = 'No data found',
  emptyIcon,
  pagination,
  sorting,
  className,
}) {
  const [internalSorting, setInternalSorting] = useState([]);
  const [internalPagination, setInternalPagination] = useState({
    pageIndex: 0,
    pageSize: pagination?.pageSize ?? 10,
  });

  // Normalize sorting state
  const sortingState = useMemo(() => {
    if (sorting?.sortBy !== undefined) {
      if (Array.isArray(sorting.sortBy)) return sorting.sortBy;
      if (typeof sorting.sortBy === 'object' && sorting.sortBy !== null && sorting.sortBy.id) {
        return [sorting.sortBy];
      }
      if (typeof sorting.sortBy === 'string') {
        return [{ id: sorting.sortBy, desc: false }];
      }
      return [];
    }
    return internalSorting;
  }, [sorting?.sortBy, internalSorting]);

  const handleSortingChange = (updaterOrValue) => {
    const nextSorting =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sortingState)
        : updaterOrValue;

    if (sorting?.onSortChange) {
      sorting.onSortChange(nextSorting);
    } else {
      setInternalSorting(nextSorting);
    }
  };

  // Determine pagination state
  const paginationState = useMemo(() => {
    if (!pagination) {
      return internalPagination;
    }
    return {
      pageIndex: pagination.pageIndex ?? internalPagination.pageIndex,
      pageSize: pagination.pageSize ?? internalPagination.pageSize,
    };
  }, [pagination, internalPagination]);

  const isManualPagination = Boolean(
    pagination &&
      (pagination.pageCount !== undefined || pagination.totalItems !== undefined)
  );

  const calculatedPageCount = useMemo(() => {
    if (pagination?.pageCount !== undefined) {
      return pagination.pageCount;
    }
    if (pagination?.totalItems !== undefined) {
      return Math.max(1, Math.ceil(pagination.totalItems / (pagination.pageSize || 10)));
    }
    return undefined;
  }, [pagination?.pageCount, pagination?.totalItems, pagination?.pageSize]);

  // eslint-disable-next-line react/incompatible-library
  const table = useReactTable({
    data: data ?? [],
    columns: columns ?? [],
    state: {
      sorting: sortingState,
      pagination: paginationState,
    },
    onSortingChange: handleSortingChange,
    onPaginationChange: (updaterOrValue) => {
      const next =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(paginationState)
          : updaterOrValue;
      if (pagination?.onPageChange && next.pageIndex !== paginationState.pageIndex) {
        pagination.onPageChange(next.pageIndex, next.pageIndex + 1);
      }
      if (pagination?.onPageSizeChange && next.pageSize !== paginationState.pageSize) {
        pagination.onPageSizeChange(next.pageSize);
      }
      setInternalPagination(next);
    },
    manualPagination: isManualPagination,
    pageCount: calculatedPageCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handlePageChange = (newPage) => {
    // newPage is 1-indexed from Pagination component
    const zeroIndexed = newPage - 1;
    table.setPageIndex(zeroIndexed);
    if (pagination?.onPageChange) {
      pagination.onPageChange(zeroIndexed, newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    table.setPageSize(newSize);
    if (pagination?.onPageSizeChange) {
      pagination.onPageSizeChange(newSize);
    }
  };

  // 1. Loading state
  if (isLoading) {
    return (
      <TableSkeleton
        rows={pagination?.pageSize || 5}
        columns={columns.length || 4}
        className={className}
      />
    );
  }

  // 2. Empty state
  if (!isLoading && (!data || data.length === 0)) {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <div className="py-8">
          <EmptyState
            icon={emptyIcon}
            title={emptyMessage}
          />
        </div>
      </Card>
    );
  }

  // 3. Render Table
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sorted = header.column.getIsSorted();

                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        'px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider select-none',
                        canSort && 'cursor-pointer hover:bg-slate-100 hover:text-slate-700'
                      )}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className="flex items-center gap-1.5">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {canSort && (
                          <span className="shrink-0 text-slate-400">
                            {sorted === 'asc' ? (
                              <ArrowUp className="h-3.5 w-3.5 text-blue-600" />
                            ) : sorted === 'desc' ? (
                              <ArrowDown className="h-3.5 w-3.5 text-blue-600" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-slate-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-4 border-t border-slate-200 bg-white">
          <Pagination
            currentPage={
              pagination.pageIndex !== undefined
                ? pagination.pageIndex + 1
                : table.getState().pagination.pageIndex + 1
            }
            totalPages={
              pagination.pageCount ??
              (pagination.totalItems !== undefined
                ? Math.max(1, Math.ceil(pagination.totalItems / (pagination.pageSize || 10)))
                : table.getPageCount())
            }
            onPageChange={handlePageChange}
            pageSize={pagination.pageSize ?? table.getState().pagination.pageSize}
            totalItems={pagination.totalItems ?? (data?.length || 0)}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </Card>
  );
}

export { DataTable };

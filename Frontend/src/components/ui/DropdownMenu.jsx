import { useState, useRef, useEffect, createContext, useContext, cloneElement, isValidElement, useCallback } from 'react';
import { cn } from '@/utils/cn';

const DropdownContext = createContext(null);

const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a DropdownMenu');
  }
  return context;
};

/**
 * Dropdown Menu Container Component
 * Supports both compound usage (<DropdownMenuTrigger>, <DropdownMenuContent>)
 * and shorthand usage via the `trigger` prop.
 */
export function DropdownMenu({
  children,
  trigger,
  align = 'right',
  className,
  open: controlledOpen,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const containerRef = useRef(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setIsOpen = useCallback((nextOpen) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  }, [isControlled, onOpenChange]);

  const closeMenu = useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  const contextValue = {
    isOpen,
    setIsOpen,
    toggleMenu,
    closeMenu,
    align,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={containerRef} className={cn('relative inline-block text-left', className)}>
        {trigger ? (
          <>
            <div onClick={toggleMenu} role="button" tabIndex={0} className="inline-flex cursor-pointer">
              {trigger}
            </div>
            {isOpen && (
              <DropdownMenuContent align={align}>
                {children}
              </DropdownMenuContent>
            )}
          </>
        ) : (
          children
        )}
      </div>
    </DropdownContext.Provider>
  );
}

/**
 * Trigger component for the dropdown menu
 */
export function DropdownMenuTrigger({ children, className, asChild = false, ...props }) {
  const { toggleMenu } = useDropdown();

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        toggleMenu();
      },
      className: cn(children.props.className, className),
      ...props,
    });
  }

  return (
    <button
      type="button"
      onClick={toggleMenu}
      className={cn('inline-flex items-center justify-center outline-none', className)}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Dropdown Menu Content container
 */
export function DropdownMenuContent({
  children,
  align = 'right',
  width = 'w-56',
  className,
  ...props
}) {
  const { isOpen, align: contextAlign } = useDropdown();
  const effectiveAlign = align || contextAlign;

  if (!isOpen) return null;

  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className={cn(
        'absolute z-50 mt-2 rounded-lg bg-white p-1.5 shadow-lg border border-slate-200 outline-none animate-in fade-in-0 zoom-in-95',
        'dark:bg-slate-900 dark:border-slate-800 dark:shadow-slate-950/50',
        width,
        effectiveAlign === 'right' ? 'right-0' : 'left-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Individual dropdown menu item
 */
export function DropdownMenuItem({
  children,
  icon: Icon,
  onClick,
  danger = false,
  disabled = false,
  className,
  ...props
}) {
  const { closeMenu } = useDropdown();

  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
    closeMenu();
  };

  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'group flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors text-left outline-none cursor-pointer',
        danger
          ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40'
          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon
          className={cn(
            'h-4 w-4 shrink-0 transition-colors',
            danger
              ? 'text-red-500 group-hover:text-red-600 dark:text-red-400'
              : 'text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200'
          )}
        />
      )}
      <span className="flex-1 truncate">{children}</span>
    </button>
  );
}

/**
 * Divider / separator between menu items
 */
export function DropdownMenuDivider({ className }) {
  return <div className={cn('my-1 h-px bg-slate-100 dark:bg-slate-800', className)} role="separator" />;
}

export const DropdownMenuSeparator = DropdownMenuDivider;

/**
 * Label / header for a section or user information
 */
export function DropdownMenuLabel({ children, className }) {
  return (
    <div className={cn('px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider', className)}>
      {children}
    </div>
  );
}

export default DropdownMenu;

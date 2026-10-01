import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Moon,
  Sun,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useThemeStore } from '@/store/useThemeStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { DropdownMenu, DropdownMenuItem, DropdownMenuDivider } from '@/components/ui/DropdownMenu';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/utils/cn';

/**
 * Generates human-friendly breadcrumb segments from current pathname.
 */
function getBreadcrumbs(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 0) return [{ label: 'Dashboard', path: '/' }];

  return parts.map((part, index) => {
    const formatted = part
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
    const path = '/' + parts.slice(0, index + 1).join('/');
    return { label: formatted, path };
  });
}

/**
 * Top Navigation Bar Component
 * Positioned fixed at the top, offset dynamically by the desktop sidebar width.
 */
export function Navbar({ className }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { isCollapsed, toggle } = useSidebarStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const sidebarWidth = isMobile ? '0px' : isCollapsed ? '64px' : '256px';

  const breadcrumbs = getBreadcrumbs(location.pathname);
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 z-30 h-16 bg-white border-b border-slate-200 transition-all duration-300',
          'dark:bg-slate-900 dark:border-slate-800',
          className
        )}
        style={{ left: sidebarWidth }}
      >
        <div className="flex items-center justify-between px-4 h-full">
          {/* ================================================================= */}
          {/* Left Side: Hamburger toggle (mobile) + Breadcrumbs / Title        */}
          {/* ================================================================= */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={toggle}
              className="p-2 -ml-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg md:hidden dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb / Page Title */}
            <div className="flex flex-col">
              <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                {breadcrumbs.map((crumb, idx) => {
                  const isLast = idx === breadcrumbs.length - 1;
                  return (
                    <div key={crumb.path} className="flex items-center gap-1.5">
                      {idx > 0 && <ChevronRight className="h-3 w-3 text-slate-400" />}
                      <span className={cn(isLast ? 'font-medium text-slate-800 dark:text-slate-200' : 'hover:text-slate-700 dark:hover:text-slate-300')}>
                        {crumb.label}
                      </span>
                    </div>
                  );
                })}
              </nav>
              <h1 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-tight">
                {pageTitle}
              </h1>
            </div>
          </div>

          {/* ================================================================= */}
          {/* Right Side: Theme toggle, Notifications, User Menu                */}
          {/* ================================================================= */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-amber-500 transition-transform duration-200 hover:rotate-45" />
              ) : (
                <Moon className="h-5 w-5 text-slate-600 transition-transform duration-200 hover:-rotate-12" />
              )}
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="View notifications"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {/* Red Badge Dot */}
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 ring-2 ring-white dark:ring-slate-900" />
              </span>
            </button>

            {/* User Dropdown */}
            <DropdownMenu
              align="right"
              trigger={
                <button
                  type="button"
                  className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors outline-none cursor-pointer"
                  aria-label="User menu"
                >
                  <Avatar name={user?.name || 'User'} size="sm" />
                  <div className="hidden lg:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize truncate max-w-[120px]">
                      {user?.role || 'Staff'}
                    </span>
                  </div>
                  <ChevronDown className="hidden lg:block h-3.5 w-3.5 text-slate-400" />
                </button>
              }
            >
              {/* User summary header */}
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {user?.email || `${user?.role || 'staff'}@hospital.com`}
                </p>
              </div>

              {/* Menu items */}
              <DropdownMenuItem
                icon={User}
                onClick={() => navigate(user?.role ? `/${user.role}/profile` : '/profile')}
              >
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                icon={Settings}
                onClick={() => navigate(user?.role ? `/${user.role}/settings` : '/settings')}
              >
                Settings
              </DropdownMenuItem>

              <DropdownMenuDivider />

              <DropdownMenuItem
                icon={LogOut}
                danger
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Spacer to preserve document flow height below fixed navbar */}
      <div className="h-16 shrink-0" aria-hidden="true" />
    </>
  );
}

export default Navbar;

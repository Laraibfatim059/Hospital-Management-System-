import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Stethoscope,
  Calendar,
  Building2,
  Receipt,
  BarChart3,
  Settings,
  ClipboardList,
  HeartPulse,
  BedDouble,
  Clock,
  UserPlus,
  Pill,
  Package,
  FlaskConical,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  HelpCircle,
} from 'lucide-react';
import { navigationConfig } from '@/config/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useSidebarStore } from '@/store/useSidebarStore';
import { Avatar } from '@/components/ui/Avatar';
import { Tooltip } from '@/components/ui/Tooltip';
import { cn } from '@/utils/cn';

/**
 * Mapping of icon name strings to Lucide icon components.
 */
const iconMap = {
  LayoutDashboard,
  Users,
  UserCog,
  Stethoscope,
  Calendar,
  Building2,
  Receipt,
  BarChart3,
  Settings,
  ClipboardList,
  HeartPulse,
  BedDouble,
  Clock,
  UserPlus,
  Pill,
  Package,
  FlaskConical,
  FileText,
  User,
};

/**
 * Single navigation item button
 */
function NavItem({ item, isActive, isCollapsed, onNavigate }) {
  const IconComponent = iconMap[item.icon] || HelpCircle;

  const content = (
    <button
      type="button"
      onClick={() => onNavigate(item.path)}
      className={cn(
        'group relative flex items-center rounded-lg text-sm font-medium transition-colors w-full cursor-pointer',
        isCollapsed
          ? 'justify-center h-10 w-10 mx-auto my-1 p-0'
          : 'gap-3 px-3 py-2.5 mx-2 my-0.5 w-[calc(100%-1rem)]',
        isActive
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
      )}
    >
      <IconComponent
        className={cn(
          'h-5 w-5 shrink-0 transition-transform duration-150',
          isActive
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-slate-500 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-200'
        )}
      />
      {!isCollapsed && <span className="truncate text-left">{item.label}</span>}
    </button>
  );

  if (isCollapsed) {
    return (
      <Tooltip content={item.label} position="right" className="z-50 font-medium">
        {content}
      </Tooltip>
    );
  }

  return content;
}

/**
 * Sidebar Navigation Component
 * Provides responsive desktop sidebar (collapsible) and slide-in mobile drawer.
 */
export function Sidebar({ className }) {
  const location = useLocation();
  const navigate = useNavigate();

  const role = useAuthStore((state) => state.role || state.user?.role);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const { isOpen, isCollapsed, toggleCollapse, close } = useSidebarStore();

  const menuItems = (role && navigationConfig[role]) ? navigationConfig[role] : [];

  const handleNavigate = (path) => {
    navigate(path);
    close();
  };

  const handleLogout = () => {
    logout();
    close();
    navigate('/login');
  };

  /**
   * Determine if the given menu item path is currently active.
   */
  const isRouteActive = (itemPath) => {
    if (location.pathname === itemPath) return true;
    const roleRoots = ['/admin', '/doctor', '/nurse', '/receptionist', '/patient', '/pharmacist', '/lab'];
    if (!roleRoots.includes(itemPath) && location.pathname.startsWith(`${itemPath}/`)) {
      return true;
    }
    return false;
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* Desktop Sidebar                                                           */}
      {/* ========================================================================= */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen z-30 hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 dark:bg-slate-900 dark:border-slate-800',
          isCollapsed ? 'w-16' : 'w-64',
          className
        )}
      >
        {/* 1. Logo Section (h-16) */}
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className={cn('flex items-center gap-3 overflow-hidden', isCollapsed && 'mx-auto')}>
            <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <HeartPulse className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight truncate">
                  HMS
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-blue-600 dark:text-blue-400 truncate">
                  Hospital System
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2. Navigation Section (flex-1 overflow-y-auto) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-0.5">
          {menuItems.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              isActive={isRouteActive(item.path)}
              isCollapsed={isCollapsed}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* 3. Bottom Section: collapse toggle button + user info + logout button */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-2 space-y-2 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
          {/* Collapse Toggle Button */}
          <button
            type="button"
            onClick={toggleCollapse}
            className={cn(
              'flex items-center rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors w-full cursor-pointer',
              isCollapsed ? 'justify-center h-9 w-9 mx-auto p-0' : 'gap-2 px-3 py-2'
            )}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>

          {/* User Info & Logout */}
          <div
            className={cn(
              'flex items-center rounded-lg transition-colors',
              isCollapsed
                ? 'flex-col gap-2 py-2 items-center'
                : 'justify-between px-2 py-2 bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60'
            )}
          >
            <div className={cn('flex items-center min-w-0', isCollapsed ? 'justify-center' : 'gap-2.5')}>
              {isCollapsed ? (
                <Tooltip content={`${user?.name || 'User'} (${role || 'Staff'})`} position="right">
                  <Avatar name={user?.name || 'User'} size="sm" />
                </Tooltip>
              ) : (
                <>
                  <Avatar name={user?.name || 'User'} size="sm" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize truncate">
                      {role || 'Staff'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Logout Button */}
            {isCollapsed ? (
              <Tooltip content="Logout" position="right">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </Tooltip>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors shrink-0 cursor-pointer"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* Mobile Sidebar Overlay & Drawer                                           */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop (click to close) */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer: slides in from left */}
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 flex flex-col shadow-2xl transition-transform duration-300">
            {/* Logo Section & Close Button */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight truncate">
                    HMS
                  </span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-blue-600 dark:text-blue-400 truncate">
                    Hospital System
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Section */}
            <div className="flex-1 overflow-y-auto py-3 space-y-0.5">
              {menuItems.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={isRouteActive(item.path)}
                  isCollapsed={false}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>

            {/* Bottom Section */}
            <div className="border-t border-slate-200 dark:border-slate-800 p-3 space-y-2 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center justify-between px-2.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Avatar name={user?.name || 'User'} size="sm" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize truncate">
                      {role || 'Staff'}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors shrink-0"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;

import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useSidebarStore } from '@/store/useSidebarStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

/**
 * Main authenticated application layout.
 * Hosts the fixed/responsive Sidebar, top Navbar, dynamic page content area via Outlet, and Footer.
 */
export function DashboardLayout({ className }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isCollapsed } = useSidebarStore();

  const sidebarWidth = isMobile ? '0px' : isCollapsed ? '64px' : '256px';

  return (
    <div className={cn('flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden', className)}>
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;

import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Analytics', path: '/dashboard', icon: '📊' },
  { label: 'Users', path: '/dashboard/users', icon: '👥' },
  { label: 'Products', path: '/dashboard/products', icon: '📦' },
  { label: 'Settings', path: '/dashboard/settings', icon: '⚙️' },
];

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar navItems={navItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
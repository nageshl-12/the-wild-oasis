import { NavLink } from 'react-router-dom';

import {
  LayoutDashboard,
  CalendarDays,
  House,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import UserInfoDesktop from './UserInfoDesktop';
import Logo from './Logo';
import Uploader from '../data/Uploader';

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/',
  },
  {
    label: 'Bookings',
    icon: CalendarDays,
    path: '/bookings',
  },
  {
    label: 'Cabins',
    icon: House,
    path: '/cabins',
  },
  {
    label: 'Users',
    icon: Users,
    path: '/users',
  },
];

function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`
        fixed z-50 flex border-gray-200 bg-white
        transition-all duration-300 ease-in-out

        /* Mobile bottom navigation */
       inset-x-0 bottom-0 h-18  py-2 w-full flex-row border-t pb-[env(safe-area-inset-bottom)]

        /* Desktop sidebar */
        md:inset-y-0 md:left-0 md:right-auto
        md:h-screen md:flex-col md:border-r md:border-t-0

        ${collapsed ? 'md:w-20' : 'md:w-65'}
      `}
    >
      {/* Logo */}
      <div
        className={`
          hidden h-18.5 shrink-0 items-center
          border-b border-gray-100 px-4 md:flex
          ${collapsed ? 'justify-center' : 'justify-between'}
        `}
      >
        {!collapsed && <Logo />}

        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className="
          flex w-full items-center justify-around px-1
          md:flex-1 md:flex-col md:items-stretch
          md:justify-start md:space-y-1
          md:overflow-y-auto md:px-3 md:py-6
        "
      >
        {/* Desktop section heading */}
        {!collapsed && (
          <p className="mb-4 hidden px-3 text-[11px] font-semibold uppercase tracking-widest text-gray-400 md:block">
            Workspace
          </p>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              title={collapsed ? item.label : ''}
              className={({ isActive }) => `
                flex flex-1 flex-col items-center
                justify-center gap-1 rounded-xl
                py-2 text-[11px] font-medium
                transition-all duration-200

                md:flex-none md:flex-row md:gap-3
                md:rounded-xl md:px-3 md:py-3
                md:text-sm

                ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }

                ${collapsed ? 'md:justify-center' : 'md:justify-start'}
              `}
            >
              <Icon size={21} strokeWidth={1.8} />

              <span className="md:hidden">{item.label}</span>

              {!collapsed && (
                <span className="hidden md:inline">{item.label}</span>
              )}
            </NavLink>
          );
        })}

        <NavLink
          to="/settings"
          title={collapsed ? 'Settings' : ''}
          className={({ isActive }) => `
            flex flex-1 flex-col items-center
            justify-center gap-1 rounded-xl
            py-2 text-[11px] font-medium
            transition-all duration-200

            md:flex-none md:flex-row md:gap-3
            md:rounded-xl md:px-3 md:py-3
            md:text-sm

            ${
              isActive
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
            }

            ${collapsed ? 'md:justify-center' : 'md:justify-start'}
          `}
        >
          <Settings size={21} strokeWidth={1.8} />

          <span className="md:hidden">Settings</span>

          {!collapsed && <span className="hidden md:inline">Settings</span>}
        </NavLink>
      </nav>

      {/* Desktop Profile */}
      {!collapsed && <Uploader />}

      <div className="hidden shrink-0 border-t border-gray-100 p-4 md:block">
        <UserInfoDesktop collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </aside>
  );
}

export default Sidebar;

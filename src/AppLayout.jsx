import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './ui/Header';
import Sidebar from './ui/Sidebar';

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-dvh overflow-hidden bg-gray-50">
      <Header />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`
          fixed inset-x-0 top-16 bottom-19
          min-w-0 overflow-y-auto overscroll-y-contain
          transition-all duration-300

          md:static md:h-dvh md:overflow-y-auto
          ${collapsed ? 'md:ml-20' : 'md:ml-65'}
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;

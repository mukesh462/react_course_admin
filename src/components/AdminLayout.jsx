import React, { useState, useEffect } from 'react';
import SidebarComponent from './SideBar';
import Header from './Header';

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  // Auto collapse sidebar on small screens (e.g. md breakpoint)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 968) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize(); // Initial call to handle default size
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle sidebar when clicking hamburger menu
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900">
      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar and content */}
      <div className="flex flex-grow">
        {/* Sidebar: Conditionally add `w-64` for expanded and `w-20` for collapsed */}
        <div className={`transition-width duration-300`}>
          <SidebarComponent collapsed={collapsed} />
        </div>

        {/* Main content */}
        <div className="flex-grow md:p-6 sm:p-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

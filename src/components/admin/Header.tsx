import React from 'react';
import { Video,LogOut, Shield, Menu } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import ThemeToggle from '../ThemeToggle';
interface HeaderProps {
  onLogout: () => void;
  onSidebarToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, onSidebarToggle }) => {
  const {adminOperatorData} = useAppContext();
  console.log(adminOperatorData?.name);
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Sidebar Toggle */}
        {onSidebarToggle && (
          <button
            onClick={onSidebarToggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 lg:hidden mr-4"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        )}

        {/* Left side - Company name with icon */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Video className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CaptureVision
          </span>
        </div>

        {/* Right side - Theme toggle, admin info, logout */}
        <div className="flex items-center space-x-4">
   
           <ThemeToggle />

          {/* Admin/Operator Logo with name/id */}
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-gray-800 dark:text-white">{adminOperatorData?.name}</div>
              <div className="text-gray-600 dark:text-gray-300">{adminOperatorData?.role}</div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors duration-200"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
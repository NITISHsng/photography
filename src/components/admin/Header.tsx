"use client"

import React from 'react';
import {LogOut, Shield, Menu } from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import ThemeToggle from '../ThemeToggle';
interface HeaderProps {
  onLogout: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const Header: React.FC<HeaderProps> = ({ onLogout,   sidebarOpen, setSidebarOpen }) => {
  const {adminOperatorData} = useAppContext();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-2">
      <div className={`flex items-center ${sidebarOpen ? "justify-end" : "justify-between"}`}>

        {/* Mobile Sidebar Toggle */}
        {! sidebarOpen && (
          <button
            onClick={()=>setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 lg:block mr-4"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        )}

   
        {/* Right side - Theme toggle, admin info, logout */}
        <div className="flex items-center space-x-4">
   
           <ThemeToggle />

          {/* Admin/Operator Logo with name/id */}
          <div className="flex items-center space-x-3 px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-medium text-sm text-gray-800 dark:text-white">{adminOperatorData?.name}</div>
              <div className="text-gray-600 text-[15px] dark:text-gray-300">{adminOperatorData?.role}</div>
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
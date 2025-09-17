'use client'

import React from 'react'
import { 
  LayoutDashboard, Users, BarChart3, Package, Menu, 
  Calendar, ChevronLeft, Settings, UserCheck
} from 'lucide-react'
import { useAppContext } from "@/contexts/AppContext";
interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  activeSection: string
  setActiveSection: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeSection,
  setActiveSection,
}) => {
  
  
  const {adminOperatorData}=useAppContext();
  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'from-blue-500 to-blue-600' },
    { id: 'bookings', icon: Calendar, label: 'Bookings', color: 'from-green-500 to-green-600' },
    { id: 'team', icon: Users, label: 'Team Management', color: 'from-purple-500 to-purple-600' },
    { id: 'analysis', icon: BarChart3, label: 'Analysis', color: 'from-orange-500 to-orange-600' },
    { id: 'equipment', icon: Package, label: 'Equipment Partner', color: 'from-red-500 to-red-600' },
    ...(adminOperatorData?.role === 'admin' ? [
      { id: 'operator', icon: UserCheck, label: 'Operator', color: 'from-indigo-500 to-indigo-600' },
    ] : [])
  ]

  return (
    <div className={`fixed left-0 top-0 h-full z-40 ${sidebarOpen ? 'w-64' : 'w-16'} bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-gray-700 overflow-hidden`}>
      {/* Admin Panel Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-gray-800 dark:text-white">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            title={sidebarOpen ? 'Hide Panel' : 'Show Panel'}
          >
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center ${sidebarOpen ? 'space-x-3 px-4' : 'justify-center px-2'} py-3 rounded-xl transition-all duration-200 group ${
                    activeSection === item.id
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-white'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <IconComponent className={`h-5 w-5 ${activeSection === item.id ? 'text-white' : 'group-hover:scale-110'} transition-transform duration-200`} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            AsanCapture Admin v2.0
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar
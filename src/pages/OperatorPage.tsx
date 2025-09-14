'use client'

import React, { useState } from 'react'
// import { Video } from 'lucide-react'

// Import admin components (reusing existing components)
import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'
import Dashboard from '@/components/admin/Dashboard'
import Bookings from '@/components/admin/Bookings'
import TeamManagement from '@/components/admin/TeamManagement'
import Analysis from '@/components/admin/Analysis'
import EquipmentPartner from '@/components/admin/EquipmentPartner'

interface OperatorPageProps {
  onLogout: () => void
}

const OperatorPage: React.FC<OperatorPageProps> = ({ 
  onLogout
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'bookings':
        return <Bookings />
      case 'team':
        return <TeamManagement />
      case 'analysis':
        return <Analysis />
      case 'equipment':
        return <EquipmentPartner />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex">
        {/* Fixed Sidebar - Operator doesn't have access to Operator management */}
        <Sidebar 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          userType="operator" // Force operator type to hide operator management
        />

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          {/* Header */}
          <Header 
            onLogout={onLogout}
          />

          {/* Content */}
          <main className="flex-1 p-6 overflow-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              main::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  )
}

export default OperatorPage
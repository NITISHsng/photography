'use client'

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import Dashboard from "@/components/admin/Dashboard";
import Bookings from "@/components/admin/Bookings";
import TeamManagement from "@/components/admin/TeamManagement";
import Analysis from "@/components/admin/Analysis";
import EquipmentPartner from "@/components/admin/EquipmentPartner";
import Operator from "@/components/admin/Operator";
import { useAppContext } from "@/contexts/AppContext";

interface AdminPageProps {
  onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");

  const { adminOperatorData } = useAppContext();

  // Load saved tab on mount
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem("activeTab");
      if (savedTab) {
        setActiveSection(savedTab);
      }
    } catch (error) {
      console.error("Error loading activeTab:", error);
    }
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "bookings":
        return <Bookings />;
      case "team":
        return <TeamManagement />;
      case "analysis":
        return <Analysis />;
      case "equipment":
        return <EquipmentPartner />;
      case "operator":
        return adminOperatorData?.role === "admin" ? <Operator /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          <Header onLogout={onLogout} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 p-6 overflow-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
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
  );
};

export default AdminPage;

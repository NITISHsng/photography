"use client"

import React, { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { BookingData, TeamMember } from "@/contexts/fromType";
import NearTeams from "@/components/NearTeams";

import {
  Users,
  BarChart3,
  UserCheck,
  TrendingUp,
} from "lucide-react";

export type ExtendedBookingData = BookingData & {
  createdAt: Date | null;
};

const Dashboard = () => {
  type AppContextType = {
    bookings: BookingData[];
    teamMembers: TeamMember[];
    // Add other context properties if exist
  };

  // Usage in component
  const { bookings, teamMembers } = useAppContext() as AppContextType;

  const [timeFilter, setTimeFilter] = useState(30);
  const [completedEvent, setcompletedEvent] = useState(0);

  function countCompletedBookings(bookings: BookingData[]): number {
    return bookings.filter((b) => b.details.status === "completed").length;
  }

  useEffect(() => {
    setcompletedEvent(countCompletedBookings(bookings));
  }, [bookings]);

  const lastUpdate = new Date();
  lastUpdate.setDate(lastUpdate.getDate() - timeFilter);

  const recentCompleteEvents = bookings.filter(
    (m) =>
      m.details?.completedAt &&
      new Date(m.details.completedAt) >= lastUpdate &&
      m.details.status === "completed"
  );

  const recentMembers = teamMembers.filter((m) =>
    m.createdAt ? new Date(m.createdAt) >= lastUpdate : false
  );

  const recentClients = bookings.filter((m) =>
    m.createdAt ? new Date(m.createdAt) >= lastUpdate : false
  );

  const recentEquipments = teamMembers.filter(
    (m) =>
      (m.createdAt ? new Date(m.createdAt) >= lastUpdate : false) &&
      m.role === "equipment"
  );



  return (
    <div className="space-y-8">
      {/* Time Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Dashboard Overview
        </h2>
        <div className="flex space-x-2">
          {[
            { label: "Week", value: 7 },
            { label: "Month", value: 30 },
            { label: "Year", value: 365 },
            { label: "5 Years", value: 365 * 5 },
          ].map((option) => (
            <button
              key={option.value}
              value={option.value}
              onClick={() => setTimeFilter(option.value)} // now setting number of days
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                timeFilter === option.value
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Last {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats with Colorful Icons */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {bookings.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            Total Clients
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {teamMembers.length}
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            Total Team Members
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {completedEvent}
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            Total Projects Completed
          </div>
        </div>

        {/* <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-2xl border border-orange-200 dark:border-orange-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">{dashboardStats.equipmentPartners}</div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">Equipment Partners</div>
        </div> */}
      </div>

      {/* Recent Activity */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {recentClients.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              New Clients
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Last {timeFilter} days
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              {recentEquipments.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              Equipment Partners
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Last {timeFilter} days
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {recentMembers.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              New Team Members
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Last {timeFilter} days
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {recentCompleteEvents.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm">
              Projects Completed
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
              Last {timeFilter} days
            </div>
          </div>
        </div>
      </div>
      
      <NearTeams/>
    </div>
  );
};

export default Dashboard;

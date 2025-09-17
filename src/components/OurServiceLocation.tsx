"use client";

import React, { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import {
  Search,
  MapPin,
} from "lucide-react";

const OurServiceLocation = () => {
  const { teamMembers } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  // Dummy locations for now
  const locations = teamMembers.map((m) => ({
    location: m.location,
    pincode: m.pincode,
    status: m.status,
  }));

  const filteredLocations = locations.filter((location) => {
    return (
      location.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.pincode?.includes(searchTerm)
    );
  });

  return (

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <MapPin className="h-6 w-6 mr-2 text-green-600" />
            Service Locations
          </h3>
        </div>

        {/* Search Filter */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by city, area, or pincode"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredLocations.map((location, index) => (
            <div
              key={index}
              className="relative bg-gray-50 dark:bg-gray-700 rounded-xl border p-4"
            >
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    location.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {location.status}
                </span>
              </div>
              <h4 className="font-semibold text-lg">{location.location}</h4>
              <p className="text-sm">PIN: {location.pincode}</p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default OurServiceLocation;

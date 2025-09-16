"use client";

import React, { useState ,useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { TeamMember } from "@/contexts/fromType";
import Image from "next/image";
import {
  Users,
  Search,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Award,
} from "lucide-react";
import { usePathname } from "next/navigation";

const Page = () => {
  const { teamMembers } = useAppContext(); // ✅ Correct context usage
 const pathname = usePathname();
 const [isPrivileged, setIsPrivileged] = useState<boolean>(
  pathname?.startsWith("/admin") || pathname?.startsWith("/operator")
);

useEffect(() => {
  setIsPrivileged(
    pathname?.startsWith("/admin") || pathname?.startsWith("/operator")
  );
}, [pathname]);


  // Local states for filters
  const [nameFilter, setNameFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [pincodeFilter, setPincodeFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Example toggle function
  const toggleMemberStatus = (id: string) => {
    console.log("Toggle status for:", id);
    // TODO: implement status change logic
  };

  

const filteredTeamMembers = teamMembers.filter((member: TeamMember) => {
  const matchesName = member.name.toLowerCase().includes(nameFilter.toLowerCase());
  const matchesArea = member.location
    ? member.location.toLowerCase().includes(areaFilter.toLowerCase())
    : areaFilter === "";

  if (!pincodeFilter) {
    // No pincode filter, match all
    return matchesName && matchesArea;
  }

  const memberPincodeNumber = parseInt(member.pincode, 10);
  const filterPincodeNumber = parseInt(pincodeFilter, 10);

  const matchesPincode =
    pincodeFilter.length < 6
      ? member.pincode.startsWith(pincodeFilter) // partial input → starts-with
      : memberPincodeNumber >= filterPincodeNumber - 5 &&
        memberPincodeNumber <= filterPincodeNumber + 5; // full input → ±5 range

  return matchesName && matchesArea && matchesPincode;
});

// Sort so exact full pincode matches come first
if (pincodeFilter.length === 6) {
  const filterPincodeNumber = parseInt(pincodeFilter, 10);

  filteredTeamMembers.sort((a, b) => {
    const aNumber = parseInt(a.pincode, 10);
    const bNumber = parseInt(b.pincode, 10);

    const aExact = aNumber === filterPincodeNumber ? 0 : 1;
    const bExact = bNumber === filterPincodeNumber ? 0 : 1;

    return aExact - bExact; // exact matches first
  });
}




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
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Part A - Team Members */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
            <Users className="h-6 w-6 mr-2 text-purple-600" />
            Team Members
          </h3>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Filter by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Filter by area"
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Filter by pincode"
            value={pincodeFilter}
            onChange={(e) => setPincodeFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Members list */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {filteredTeamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 p-4"
              >
                {/* Top Section: Logo/Name with ID (left) and Status/Rating (right) */}
                <div className="flex items-start justify-between mb-4">
                  {/* Left: Avatar + Name + ID */}
                  <div className="flex items-center space-x-3">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-white dark:border-gray-700 shadow-md object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                        {member.name}
                      </h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300 gap-2">
                        <span className="mr-4">Role:{member.role}</span>
                        <span>ID: {member.id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status + Rating */}
                  <div className="flex flex-col items-end space-y-2">
                    <button
                      onClick={() => toggleMemberStatus(member.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        member.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30"
                      }`}
                    >
                      {member.status === "active" ? "Active" : "Inactive"}
                    </button>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-800 dark:text-white">
                        {member.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location and Pincode */}
                <div className="flex gap-4 mb-3">
                  <span className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>{member.location}</span>
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">PIN:</span> {member.pincode}
                  </span>
                </div>

                {/* Phone and Email */}
               {isPrivileged && (

                <div className="grid grid-cols-1 gap-2 mb-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Mail className="h-4 w-4 text-orange-500" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </div>
               )} 

                {/* Experience and Total Projects */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    <span>{member.experience}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                    <Award className="h-4 w-4 text-indigo-500" />
                    <span>{member.totalProjects} projects</span>
                  </div>
                </div>

                {/* All Skills */}
                {/* <div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div> */}
              </div>
          ))}
        </div>

      </div>

      {/* Part B - Service Locations */}
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
    </div>
  );
};

export default Page;

"use client";

import { useEffect, useState } from "react";
import { BookingData } from "@/contexts/fromType";
import { useAppContext } from "@/contexts/AppContext";
import { serviceOptions } from "@/contexts/fromData";
import { getEventTypeOptions } from "@/contexts/fromData";
import { PriceHandeler } from "@/contexts/fromData";
import { AssignedTeam } from "@/contexts/fromType";
import {
  photoPackages,
  albumOptions,
  videoCategory,
  videoQualityOptions,
  extraVideos,
  preWeddingOptions,
  lightOptions,
} from "@/contexts/fromData";
import {
  Calendar,
  User,
  Phone,
  Mail,
  Delete,
  Camera,
  Video,
  Edit3,
  Package,
  Crown,
} from "lucide-react";
import Header from "@/components/Header";
import PriceCalculate from "@/components/sub_Components/PriceCalculate";

import { useParams } from 'next/navigation';

export default function ClientPage() {
  const params = useParams();
  const id = params?.id; 
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    navigateToPage,
    currentPage,
  } = useAppContext();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const [hiringRequest, setHiringRequest] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/hiring?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data: BookingData = await res.json();
        setHiringRequest(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);


  
  const myTeam = [
    { name: "Alice Johnson", role: "Video Editor", price: 150 },
    { name: "Bob Smith", role: "Camera Operator", price: 200 },
    { name: "Charlie Brown", role: "Sound Engineer", price: 180 },
    { name: "Diana Prince", role: "Director", price: 300 },
    { name: "Ethan Hunt", role: "Lighting Technician", price: 160 },
    { name: "Fiona Gallagher", role: "Producer", price: 250 },
    { name: "George Miller", role: "Gaffer", price: 140 },
    { name: "Hannah Lee", role: "Makeup Artist", price: 120 },
    { name: "Ian Somerhalder", role: "Script Supervisor", price: 170 },
    { name: "Jessica Alba", role: "Production Assistant", price: 100 },
    { name: "Kevin Hart", role: "Animator", price: 220 },
    { name: "Laura Linney", role: "Costume Designer", price: 200 },
    { name: "Michael B. Jordan", role: "Editor Assistant", price: 130 },
  ];


  const paymentStatusClasses: Record<string, string> = {
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    "Advance Paid":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    Pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    Failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    Refunded:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    Cancelled:
      "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
  };


  const getServiceIcon = (service: string) => {
    switch (service) {
      case "Cameraman":
        return <Camera className="h-4 w-4" />;
      case "Equipment Rental":
        return <Video className="h-4 w-4" />;
      case "Video Editing":
        return <Edit3 className="h-4 w-4" />;
      case "Complete Event":
        return <Package className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };
const handleChange = (
  path: string,
  value: string | number | AssignedTeam[]
) => {
  if (!hiringRequest) return;

  const updated = { ...hiringRequest };
  const keys = path.split(".");

  let obj: Record<string, unknown> = updated;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof obj[key] !== "object" || obj[key] === null) {
      throw new Error(`Invalid path: ${path}`);
    }
    obj = obj[key] as Record<string, unknown>;
  }

  obj[keys[keys.length - 1]] = value;
  setHiringRequest(updated);
};


const handleSave = async () => {
  console.log(hiringRequest);
  try {
    setSaving(true);
    
    const res = await fetch(`/api/hiring?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, ...hiringRequest }), // Combine _id and data
    });
    
    if (!res.ok) throw new Error("Failed to save");

    const data = await res.json();
    console.log("Updated successfully:", data);
    alert("Saved successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to save");
  } finally {
    setSaving(false);
  }
};


  if (loading) return <div className="p-6">Loading...</div>;
  if (!hiringRequest) return <div className="p-6">Client not found</div>;

  return (
    <div className="pt-16 bg-gray-50 dark:bg-gray-900 flex justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-0 md:p-6 w-full max-w-7xl overflow-y-auto">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          navigateToPage={navigateToPage}
          currentPage={currentPage}
        />

        <div className="grid mb-6 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Client Info */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                Client Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-blue-600" />
                  <input
                    type="text"
                    value={hiringRequest.details.name}
                    onChange={(e) =>
                      handleChange("details.name", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <input
                    type="email"
                    value={hiringRequest.details.email}
                    onChange={(e) =>
                      handleChange("details.email", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <input
                    type="text"
                    value={hiringRequest.details.phone}
                    onChange={(e) =>
                      handleChange("details.phone", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                Event Details
              </h4>

              {/* Package */}
              <div className="flex items-center space-x-3 mb-3">
                <Crown className="h-5 w-5 text-yellow-500" />
                <select
                  value={hiringRequest.details.package}
                  onChange={(e) =>
                    handleChange("details.package", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Essential">Essential</option>
                </select>
              </div>

              {/* Event Type */}
              <div className="flex items-center space-x-3 mb-3">
                {getServiceIcon(hiringRequest.details.eventType)}
                <select
                  value={hiringRequest.details.eventType}
                  onChange={(e) =>
                    handleChange("details.eventType", e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {getEventTypeOptions(hiringRequest.details.category).map(
                    (option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Event Dates */}
              <div className="space-y-2 mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Event Dates
                </label>
                {hiringRequest.details.eventTimes.map((event, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="date"
                      value={event.eventDate}
                      onChange={(e) =>
                        handleChange(
                          `details.eventTimes.${idx}.eventDate`,
                          e.target.value
                        )
                      }
                      className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="time"
                      value={event.startTime}
                      onChange={(e) =>
                        handleChange(
                          `details.eventTimes.${idx}.startTime`,
                          e.target.value
                        )
                      }
                      className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="time"
                      value={event.endTime}
                      onChange={(e) =>
                        handleChange(
                          `details.eventTimes.${idx}.endTime`,
                          e.target.value
                        )
                      }
                      className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...hiringRequest };
                        updated.details.eventTimes.splice(idx, 1);
                        setHiringRequest(updated);
                      }}
                      className="text-red-600 hover:text-red-800 px-2"
                    >
                      <Delete/>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const updated = { ...hiringRequest };
                    updated.details.eventTimes.push({
                      eventDate: "",
                      startTime: "",
                      endTime: "",
                    });
                    setHiringRequest(updated);
                  }}
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Date
                </button>
              </div>

              {/* Location Inputs */}
              <div className="grid md:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Location"
                  value={hiringRequest.details.location}
                  onChange={(e) =>
                    handleChange("details.location", e.target.value)
                  }
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Pin Code"
                  value={hiringRequest.details.pinCode}
                  onChange={(e) =>
                    handleChange("details.pinCode", e.target.value)
                  }
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="District"
                  value={hiringRequest.details.dist}
                  onChange={(e) => handleChange("details.dist", e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={hiringRequest.details.state}
                  onChange={(e) =>
                    handleChange("details.state", e.target.value)
                  }
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Near Area"
                  value={hiringRequest.details.nearArea}
                  onChange={(e) =>
                    handleChange("details.nearArea", e.target.value)
                  }
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <select
                  value={hiringRequest.details.areaType}
                  onChange={(e) =>
                    handleChange("details.areaType", e.target.value)
                  }
                  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="urban">Urban</option>
                  <option value="rural">Rural</option>
                  <option value="semi-urban">Semi-Urban</option>
                </select>
              </div>
</div>

              
            {/* Status & Payment */}
               <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2 mb-6"> 
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                Status & Payment
              </h4>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between items-center">
                  <span>Status:</span>
                  <select
                    value={hiringRequest.details.status}
                    onChange={(e) =>
                      handleChange("details.status", e.target.value)
                    }
                    className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Amount:</span>
                  <input
                    type="number"
                    value={hiringRequest.details.totalAmount}
                    onChange={(e) =>
                      handleChange("details.totalAmount", +e.target.value)
                    }
                    className="w-28 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span>Advance Paid:</span>
                  <input
                    type="number"
                    value={hiringRequest.details.advance}
                    onChange={(e) =>
                      handleChange("details.advance", +e.target.value)
                    }
                    className="w-28 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span>Payment Status:</span>
                  <select
                    value={hiringRequest.details.paymentStatus}
                    onChange={(e) =>
                      handleChange("details.paymentStatus", e.target.value)
                    }
                    className="px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {Object.keys(paymentStatusClasses).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
 </div>
            {/* Assigned Team */}
               <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2 mb-6"> 
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
              <h4 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">
                Assigned Team
              </h4>

              {/* Assigned Members */}
              {hiringRequest.details.assignedTeam?.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">
                  No team assigned yet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {hiringRequest.details.assignedTeam?.map((member, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center text-gray-600 dark:text-gray-300 rounded-lg p-2"
                    >
                      <div className="flex gap-2 items-center">
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 items-center">
                        {/* Editable Price */}
                        <input
                          type="number"
                          className="w-28 px-2 py-1 rounded-lg border dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                          value={member.price}
                          onChange={(e) => {
                            const updatedTeam = [
                              ...hiringRequest.details.assignedTeam!,
                            ];
                            updatedTeam[idx].price = Number(e.target.value);
                            handleChange("details.assignedTeam", updatedTeam);
                          }}
                        />

                        {/* Remove Button */}
                        <button
                          onClick={() => {
                            const updatedTeam =
                              hiringRequest.details.assignedTeam!.filter(
                                (_, i) => i !== idx
                              );
                            handleChange("details.assignedTeam", updatedTeam);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                      <Delete/>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
</div>
              {/* Add Member from myTeam */}
                 <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2 mb-6"> 
              <div className="mt-4">
                <label className="block mb-2 text-gray-700 dark:text-gray-300">
                  Add Team Member:
                </label>
                <select
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  onChange={(e) => {
                    const selected = myTeam.find(
                      (member) => member.name === e.target.value
                    );
                    if (selected) {
                      const updatedTeam = [
                        ...(hiringRequest.details.assignedTeam || []),
                        { ...selected },
                      ];
                      handleChange("details.assignedTeam", updatedTeam);
                    }
                  }}
                >
                  <option value="">Select a team member</option>
                  {myTeam.map((member) => (
                    <option key={member.name} value={member.name}>
                      {member.name} - {member.role} (₹{member.price})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            </div>
            {/* Additional Notes */}
            {hiringRequest.details.message && (
                 <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                <h4 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
                  Additional Notes
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {hiringRequest.details.message}
                </p>
              </div>
            </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Selected Services */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2 mb-6">
              <h4 className="text-lg font-bold mb-4 ml-4 text-gray-800 dark:text-white">
                Selected Services
              </h4>

              <div className="flex flex-wrap gap-2 justify-evenly">
                {serviceOptions.event.map((service) => {
                  const isSelected = hiringRequest.selectedService.some(
                    (s) => s.id === service.id
                  );
                  const { mrp, discount, finalPrice } = PriceHandeler(
                    service.price,
                    service.discount,
                    hiringRequest.details.package,
                    hiringRequest.details.areaType
                  );

                  const toggleService = () => {
                    const updated = { ...hiringRequest };
                    if (isSelected) {
                      updated.selectedService = updated.selectedService.filter(
                        (s) => s.id !== service.id
                      );
                    } else {
                      updated.selectedService.push({
                        id: service.id,
                        price: finalPrice,
                      });
                    }
                    setHiringRequest(updated);
                  };

                  return (
                    <div
                      key={service.id}
                      onClick={toggleService}
                      className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer min-w-[150px] transition ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-evenly">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {service.name}
                          </p>
                <div className="font-light text-[10px] text-gray-800 dark:text-white mx-2">
                            <span>₹{mrp}</span>
                            <span className="m-1">{discount}%</span>
                            <span>₹{finalPrice}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-5 h-5 mx-2 text-blue-600 rounded border-gray-300 dark:border-gray-500 pointer-events-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* Photography Packages */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2 mb-6">
              <h4 className="text-lg font-bold mb-4 ml-4 text-gray-800 dark:text-white">
                Photography Packages
              </h4>

              <div className="flex flex-wrap gap-2 justify-evenly">
                {photoPackages.map((pkg) => {
                  const isSelected =
                    hiringRequest.requiredServices.photography.photoTypes.some(
                      (p) => p.id === pkg.id
                    );
                  const {mrp , discount ,  finalPrice } = PriceHandeler(
                    pkg.price,
                    pkg.discount,
                    hiringRequest.details.package,
                    hiringRequest.details.areaType
                  );

                  const togglePackage = () => {
                    const updated = { ...hiringRequest };
                    if (isSelected) {
                      updated.requiredServices.photography.photoTypes =
                        updated.requiredServices.photography.photoTypes.filter(
                          (p) => p.id !== pkg.id
                        );
                    } else {
                      updated.requiredServices.photography.photoTypes.push({
                        id: pkg.id,
                        price: finalPrice,
                      });
                    }
                    setHiringRequest(updated);
                  };

                  return (
                    <div
                      key={pkg.id}
                      onClick={togglePackage}
                      className={`flex items-center justify-between p-2 rounded-lg border cursor-pointer min-w-[150px] transition ${
                        isSelected
                          ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {pkg.label}
                          </p>
                <div className="font-light text-[10px] text-gray-800 dark:text-white mx-2">
                            <span>₹{mrp}</span>
                            <span className="m-1">{discount}%</span>
                            <span>₹{finalPrice}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-5 h-5 mx-2 text-cyan-600 rounded border-gray-300 dark:border-gray-500 pointer-events-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
    {/* Album Options */}
              <h4 className="text-lg font-bold m-4 text-gray-800 dark:text-white">
                Album Options
              </h4>

              <div className="flex flex-wrap gap-2 justify-evenly">
                {albumOptions.map((album) => {
                  const isSelected =
                    hiringRequest.requiredServices.photography.albumTypes.some(
                      (a) => a.id === album.id
                    );

                  const { mrp, discount, finalPrice } = PriceHandeler(
                  album.price,
                  album.discount,
                    hiringRequest.details.package,
                    hiringRequest.details.areaType
                  );
                  const toggleAlbum = () => {
                    const updated = { ...hiringRequest };
                    if (isSelected) {
                      updated.requiredServices.photography.albumTypes =
                        updated.requiredServices.photography.albumTypes.filter(
                          (a) => a.id !== album.id
                        );
                    } else {
                      updated.requiredServices.photography.albumTypes.push({
                        id: album.id,
                        price: finalPrice,
                      });
                    }
                    setHiringRequest(updated);
                  };

                  return (
                    <div
                      key={album.id}
                      onClick={toggleAlbum}
                      className={`flex items-center justify-between p-2 rounded-lg border min-w-[200px] cursor-pointer transition ${
                        isSelected
                          ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {album.label}
                        </p>
                        <div className="font-light text-[10px] text-gray-800 dark:text-white mx-2">
                            <span>₹{mrp}</span>
                            <span className="m-1">{discount}%</span>
                            <span>₹{finalPrice}</span>
                          </div>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {album.desc}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">

                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-5 h-5 text-cyan-600 mx-2 rounded border-gray-300 dark:border-gray-500 pointer-events-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* Video Category */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2 mb-6">
              <h4 className="text-lg font-bold mb-4 ml-4 text-gray-800 dark:text-white">
                Video Package
              </h4>

              <div className="flex flex-wrap mb-4 gap-2 justify-evenly">
                {videoCategory.map((cat) => {
                  const isSelected =
                    hiringRequest.requiredServices.videography.videoCategory
                      .id === cat.id;

                   const { mrp, discount, finalPrice } = PriceHandeler(
                    cat.price,
                    cat.discount,
                    hiringRequest.details.package,
                    hiringRequest.details.areaType
                  );

                  return (
                    <div
                      key={cat.id}
                      className={`flex items-center justify-evenly p-3 rounded-lg border min-w-[150px] cursor-pointer ${
                        isSelected
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                      onClick={() => {
                        const updated = { ...hiringRequest };
                        updated.requiredServices.videography.videoCategory = {
                          id: cat.id as "classic" | "cinematic" | "standard",
                          price: finalPrice,
                        };
                        setHiringRequest(updated);
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {cat.name}
                          </p>
                   <div className="font-light text-[10px] text-gray-800 dark:text-white mx-2">
                            <span>₹{mrp}</span>
                            <span className="m-1">{discount}%</span>
                            <span>₹{finalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            {/* Duration Input */}
              {/* <h4 className="text-lg font-bold m-4 text-gray-800 dark:text-white">
                Video Duration
              </h4> */}
              <input
                type="number"
                min={10}
                step={10}
                value={
                  hiringRequest.requiredServices.videography.durationMinutes
                }
                onChange={(e) => {
                  const updated = { ...hiringRequest };
                  updated.requiredServices.videography.durationMinutes = Number(
                    e.target.value
                  );
                  setHiringRequest(updated);
                }}
                className="w-44 px-3 py-2 mx-4 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                minutes
              </span>

            {/* Video Quality */}
              {/* <h4 className="text-lg font-bold m-4 text-gray-800 dark:text-white">
                Video Quality
              </h4> */}

              <div className="flex m-4 flex-wrap gap-2 justify-evenly">
                {videoQualityOptions.map((quality) => {
                  const isSelected =
                    hiringRequest.requiredServices.videography.videoQuality
                      .id === quality.id;

                                       const { mrp, discount, finalPrice } = PriceHandeler(
                    quality.price,
                    quality.discount,
                    hiringRequest.details.package,
                    hiringRequest.details.areaType
                  );

                  return (
                    <div
                      key={quality.id}
                      className={`flex items-center justify-between p-3 max-h-[150px] rounded-lg border cursor-pointer ${
                        isSelected
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                      onClick={() => {
                        const updated = { ...hiringRequest };
                        updated.requiredServices.videography.videoQuality = {
                          id: quality.id as "" | "1080p" | "4k" | "8k",
                          price: finalPrice,
                        };
                        setHiringRequest(updated);
                      }}
                    >
                      <div className="flex items-center gap-3 justify-evenly">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {quality.label}
                          </p>
                   <div className="font-light text-[10px] text-gray-800 dark:text-white mx-2">
                            <span>₹{mrp}</span>
                            <span className="m-1">{discount}%</span>
                            <span>₹{finalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            {/* Extra Videos */}
              {/* <h4 className="text-lg font-bold m-4 text-gray-800 dark:text-white">
                Extra Videos
              </h4> */}

              <div className="flex m-4 flex-wrap gap-2 justify-evenly">
                {extraVideos.map((video) => {
                  const isSelected =
                    hiringRequest.requiredServices.videography.extraVideos.some(
                      (ev) => ev.id === video.id
                    );

                   const { mrp, discount, finalPrice } = PriceHandeler(
                    video.price,
                    video.discount,
                    hiringRequest.details.package,
                    hiringRequest.details.areaType
                  );

                  return (
                    <label
                      key={video.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                        isSelected
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-3 justify-evenly">
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">
                            {video.label}
                          </p>
                <div className="font-light text-[10px] text-gray-800 dark:text-white mx-2">
                            <span>₹{mrp}</span>
                            <span className="m-1">{discount}%</span>
                            <span>₹{finalPrice}</span>
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          const updated = { ...hiringRequest };
                          if (isSelected) {
                            updated.requiredServices.videography.extraVideos =
                              updated.requiredServices.videography.extraVideos.filter(
                                (ev) => ev.id !== video.id
                              );
                          } else {
                            updated.requiredServices.videography.extraVideos.push(
                              {
                                id: video.id,
                                price: finalPrice,
                              }
                            );
                          }
                          setHiringRequest(updated);
                        }}
                        className="h-5 w-5 accent-orange-500 m-2"
                      />
                    </label>
                  );
                })}
              </div>
</div>
            {/* Pre-Wedding Options */}
               <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold m-4 text-gray-800 dark:text-white">
                Pre-Wedding Shoot Options
              </h4>

              <div className="flex flex-wrap gap-2 justify-evenly">
                {preWeddingOptions.map((pkg) => {
                  const isSelected =
                    hiringRequest.requiredServices.preWedding.some(
                      (p) => p.id === pkg.id
                    );
                 const { mrp, discount, finalPrice } = PriceHandeler(
                    pkg.price,
                    pkg.discount,
                    hiringRequest.details.package,
                    hiringRequest.details.areaType
                  );
                  return (
                    <label
                      key={pkg.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                        isSelected
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-900/30"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {pkg.label}
                        </p>
                                        <div className="font-light text-[10px] text-gray-800 dark:text-white mx-2">
                            <span>₹{mrp}</span>
                            <span className="m-1">{discount}%</span>
                            <span>₹{finalPrice}</span>
                          </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          const updated = { ...hiringRequest };
                          if (isSelected) {
                            // remove if already selected
                            updated.requiredServices.preWedding =
                              updated.requiredServices.preWedding.filter(
                                (p) => p.id !== pkg.id
                              );
                          } else {
                            // add new selection
                            updated.requiredServices.preWedding.push({
                              id: pkg.id,
                              price: pkg.price,
                            });
                          }
                          setHiringRequest(updated);
                        }}
                        className="h-5 w-5 mx-2 accent-pink-500"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Stage Lighting */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                Stage Lighting Options
              </h4>

              <div className="grid gap-3">
                {lightOptions.map((light) => {
                  const isSelected =
                    hiringRequest.requiredServices.stageLights.some(
                      (l) => l.id === light.id
                    );

                  return (
                    <label
                      key={light.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer ${
                        isSelected
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                          : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                    >
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-800 dark:text-white">
                          {light.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {light.description}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {
                          const updated = { ...hiringRequest };
                          if (isSelected) {
                            updated.requiredServices.stageLights =
                              updated.requiredServices.stageLights.filter(
                                (l) => l.id !== light.id
                              );
                          } else {
                            updated.requiredServices.stageLights.push({
                              id: light.id,
                              price: light.price,
                            });
                          }
                          setHiringRequest(updated);
                        }}
                        className="h-5 w-5 accent-indigo-500"
                      />
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 my-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>

        <PriceCalculate localBooking={hiringRequest} />
      </div>
    </div>
  );
};


"use client"

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  Filter,
  Search,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Camera,
  Video,
  Edit3,
  Package,
  X,
  Crown,
  IdCard,
} from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import PriceCalculate from "../sub_Components/PriceCalculate";
import { BookingData, EventTimeSlot} from "@/contexts/fromType";

const Bookings: React.FC = () => {
  type BookingWithId = BookingData & { _id: string };
  const { bookings } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingWithId | null>(null);
  const getStatusColor = (status: string) => {

    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
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

  const filteredBookings = bookings.filter((booking: BookingData) => {
    const name = booking.details?.name?.toLowerCase() || "";
    const pinCode = booking.details?.pinCode?.toLowerCase() || "";
    const phone = booking.details?.phone?.toLowerCase() || "";
    const status = booking.details?.status?.toLowerCase() || "";

    // ✅ search by name, pinCode, or phone
    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      pinCode.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm.toLowerCase());

    // ✅ filter by status ("complete", "cancel"), empty string means "all"
    const matchesStatus =
      statusFilter === "" || status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(
      (b: BookingData) => b.details?.status === "confirmed"
    ).length,
    pending: bookings.filter(
      (b: BookingData) => b.details?.status === "pending"
    ).length,
    completed: bookings.filter(
      (b: BookingData) => b.details?.status === "completed"
    ).length,
    cancelled: bookings.filter(
      (b: BookingData) =>
        b.details?.status === "cancel" || b.details?.status === "cancelled"
    ).length,
  };

  // Working action handlers
  const handleViewBooking = (booking: BookingWithId) => {
    setSelectedBooking(booking);
  };
  useEffect(() => {
    setShowViewModal(true);
    console.log(selectedBooking);
  }, [selectedBooking]);
  
  const handleAddBooking = () => {
    setShowAddModal(true);
  };

  const handleSaveBooking = () => {
    alert("Booking saved successfully!");
    setShowAddModal(false);
    setSelectedBooking(null);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setSelectedBooking(null);
  };

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

  if (!filteredBookings) {
    return;
  }
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Bookings Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage all client bookings and event schedules
            </p>
          </div>
          <button
            onClick={handleAddBooking}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Booking
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800 dark:text-white">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Bookings
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.confirmed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Confirmed
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Pending
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Completed
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.cancelled}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Cancelled
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Services</option>
            <option value="Cameraman">Cameraman</option>
            <option value="Equipment Rental">Equipment Rental</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Complete Event">Complete Event</option>
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button className="inline-flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200">
            <Filter className="h-5 w-5 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Client Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {(filteredBookings as BookingWithId[]).map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <IdCard className="h-4 w-4"/>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {booking.id}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {booking.details.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {booking.details.name}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                        <Mail className="h-3 w-3" />
                        <span className="truncate max-w-32">
                          {booking.details.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                        <Phone className="h-3 w-3" />
                        <span>{booking.details.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {booking.details.eventType}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {booking.details?.eventTimes?.[0]?.eventDate}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-3 w-3" />
                        <span>
                          {booking.details?.eventTimes?.[0]?.startTime} -{" "}
                          {booking.details?.eventTimes?.[0]?.endTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-32">
                          {booking.details.pinCode}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.details.status
                      )}`}
                    >
                      {getStatusIcon(booking.details.status)}
                      <span className="capitalize">
                        {booking.details.status}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      ₹{booking.details.totalAmount}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      ₹{booking.details.advance}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      ₹{booking.details.totalAmount - booking.details.advance}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                        title="Edit Booking"
                      >
                        <Link
                          rel="stylesheet"
                          href={`edit/client/${booking._id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Add New Booking
              </h3>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Client Name"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">Select Service</option>
                <option value="cameraman">Cameraman</option>
                <option value="equipment">Equipment Rental</option>
                <option value="editing">Video Editing</option>
                <option value="complete">Complete Event</option>
              </select>
              <input
                type="date"
                placeholder="Event Date"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Event Location"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={closeModals}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBooking}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Booking Details Modal */}
      {showViewModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Booking Details - {selectedBooking._id}
              </h3>
              <button
                onClick={closeModals}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid mb-6 lg:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                    Client Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-800 dark:text-white">
                        {selectedBooking.details.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-green-600" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {selectedBooking.details.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {selectedBooking.details.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                    Event Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Crown className="size-5" />
                      <span className="font-medium text-gray-800 dark:text-white">
                        {selectedBooking.details.package}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getServiceIcon(selectedBooking.details.eventType)}
                      <span className="font-medium text-gray-800 dark:text-white">
                        {selectedBooking.details.eventType}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />

                      <div className="items-start w-full">
                        {selectedBooking.details.eventTimes.map(
                          (event: EventTimeSlot, index: number) => {
                            return (
                              <div
                                key={index}
                                className="w-full flex justify-between"
                              >
                                <span>{event.eventDate}</span>

                                <span className="flex gap-4">
                                  <span>{event.startTime}</span>
                                  <span>{event.endTime}</span>
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-red-600" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {selectedBooking.details.location} {","}
                        {selectedBooking.details.nearArea} {","}
                        {selectedBooking.details.pinCode} {","}
                        {selectedBooking.details.dist} {","}
                        {selectedBooking.details.state} {","}
                        India
                      </span>
                    </div>
                  </div>
                </div>
                {selectedBooking.details.message && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                    <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                      Additional Notes
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedBooking.details.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column - Status & Team */}
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                  <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                    Status & Payment
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Booking Status:{" "}
                        {selectedBooking.details.status
                          .charAt(0)
                          .toUpperCase() +
                          selectedBooking.details.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Total Amount: {selectedBooking.details.totalAmount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Payment Status:
                      </span>

                      <span
                        className={`px-3 rounded-full text-sm font-medium ${
                          paymentStatusClasses[
                            selectedBooking.details.paymentStatus
                          ] || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {selectedBooking.details.paymentStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Advance Paid:{selectedBooking.details.advance}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Remaining:
                        {selectedBooking.details.totalAmount -
                          selectedBooking.details.advance}
                      </span>
                    </div>
                  </div>
                </div>

                {/* <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                  <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
                    Assigned Team
                  </h2>
                  {selectedBooking.details.assignedTeam.length === 0 ? (
                    <p>No team assigned yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {selectedBooking.details.assignedTeam.map(
                        (member: PersonRole, index: number) => (
                          <li
                            key={index}
                            className="rounded-lg flex justify-between items-center text-gray-600 dark:text-gray-300"
                          >
                            <div className="flex gap-2">
                              <p className="font-semibold">{member.name}</p>
                              <p className="text-sm text-gray-500">
                                {member.role}
                              </p>
                            </div>
                            <div className="font-medium">₹{1000}</div>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div> */}
              </div>
            </div>
            <PriceCalculate localBooking={selectedBooking} />

            <div className="flex space-x-4 mt-8">
              <button
                onClick={closeModals}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;

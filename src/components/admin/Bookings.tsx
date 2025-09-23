"use client"

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
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
  X,
  IdCard,
} from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import { BookingData, EventTimeSlot} from "@/contexts/fromType";
import BookingInformation from "../sub_Components/BookingInformation";
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
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
  {/* Table for large screens */}
  <div className="hidden lg:block overflow-x-auto">
    <table className="min-w-full table-auto">
      <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0 z-10">
        <tr>
          {["Booking Details", "Client Info", "Event Details", "Status", "Amount", "Actions"].map((col) => (
            <th
              key={col}
              className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {(filteredBookings as BookingWithId[]).map((booking) => (
          <tr
            key={booking._id}
            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                  <IdCard className="h-4 w-4" />
                  <span className="font-medium text-gray-900 dark:text-white">{booking.id}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{booking.details.category}</div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium text-gray-900 dark:text-white">{booking.details.name}</div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <Mail className="h-3 w-3" />
                <span className="truncate max-w-32">{booking.details.email}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <Phone className="h-3 w-3" />
                <span>{booking.details.phone}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium text-gray-900 dark:text-white">{booking.details.eventType}</div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="h-3 w-3" />
                <span>{booking.details?.eventTimes?.[0]?.eventDate}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="h-3 w-3" />
                <span>{booking.details?.eventTimes?.[0]?.startTime} - {booking.details?.eventTimes?.[0]?.endTime}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-3 w-3" />
                <span className="truncate max-w-32">{booking.details.pinCode}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.details.status)}`}>
                {getStatusIcon(booking.details.status)}
                <span className="capitalize">{booking.details.status}</span>
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium text-gray-900 dark:text-white">₹{booking.details.totalAmount}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">₹{booking.details.advance}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">₹{booking.details.totalAmount - booking.details.advance}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
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
                  <Link rel="stylesheet" href={`edit/client/${booking._id}`}>
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
  
  {/* Cards for mobile and md screens */}
  <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
    {(filteredBookings as BookingWithId[]).map((booking) => (
      <div
        key={booking._id}
        className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow transition hover:shadow-md"
      >
        <div className="flex justify-between mb-2">
          <span className="font-bold text-gray-900 dark:text-white">{booking.details.name}</span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.details.status)}`}>
            {booking.details.status}
          </span>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          <IdCard className="inline h-4 w-4 mr-1"/> {booking.id} - {booking.details.category}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          <Mail className="inline h-3 w-3 mr-1"/> {booking.details.email}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          <Phone className="inline h-3 w-3 mr-1"/> {booking.details.phone}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          <Calendar className="inline h-3 w-3 mr-1"/> {booking.details?.eventTimes?.[0]?.eventDate} &nbsp;
          <Clock className="inline h-3 w-3 mr-1"/> {booking.details?.eventTimes?.[0]?.startTime} - {booking.details?.eventTimes?.[0]?.endTime}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <MapPin className="inline h-3 w-3 mr-1"/> {booking.details.pinCode}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-900 dark:text-white">₹{booking.details.totalAmount}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewBooking(booking)}
              className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
            >
              <Link rel="stylesheet" href={`edit/client/${booking._id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </button>
          </div>
        </div>
      </div>
    ))}
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
        <BookingInformation selectedBooking={selectedBooking} setShowViewModal={setShowViewModal}/>
      )}
    </div>
  );
};

export default Bookings;

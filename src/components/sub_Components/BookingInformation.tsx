import React from 'react'
import { BookingWithId } from '@/contexts/fromType'
import {
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Camera,
  Video,
  Edit3,
  Package,
  X,
  Crown,
  IdCardLanyard
} from "lucide-react";
// import Image from 'next/image';
interface BookingInformationProps {
  selectedBooking: BookingWithId;
  setShowViewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

import {EventTimeSlot} from "@/contexts/fromType";
import PriceCalculate from "../sub_Components/PriceCalculate";
const BookingInformation: React.FC<BookingInformationProps> = ({ selectedBooking ,setShowViewModal}) => {

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

  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Booking Details - {selectedBooking._id}
              </h3>
              <button
                onClick={()=>setShowViewModal(false)}
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
      <span className="font-medium text-gray-500 dark:text-gray-400"><IdCardLanyard className="h-5 w-5 text-sky-500"/> </span>
      <span className="font-medium text-gray-800 dark:text-white">
        {selectedBooking.id}
      </span>
    </div>
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
    {/* Package */}
    <div className="flex items-center space-x-3">
      <Crown className="h-5 w-5 text-yellow-500" />
      <span className="font-medium text-gray-800 dark:text-white">
        {selectedBooking.details.package}
      </span>
    </div>

    {/* Event Type */}
    <div className="flex items-center space-x-3">
      {getServiceIcon(selectedBooking.details.eventType)}
      <span className="font-medium text-gray-800 dark:text-white">
        {selectedBooking.details.eventType} ({selectedBooking.details.category})
      </span>
    </div>

    {/* Event Dates & Times */}
    <div className="flex items-center space-x-3">
      <Calendar className="h-5 w-5 text-blue-600" />
      <div className="items-start w-full">
        {selectedBooking.details.eventTimes.map(
          (event: EventTimeSlot, index: number) => (
            <div key={index} className="w-full flex justify-between">
              <span>{event.eventDate}</span>
              <span className="flex gap-4">
                <span>{event.startTime}</span>
                <span>{event.endTime}</span>
              </span>
            </div>
          )
        )}
      </div>
    </div>

    {/* Location */}
    <div className="flex items-center space-x-3">
      <MapPin className="h-5 w-5 text-red-600" />
      <span className="text-gray-600 dark:text-gray-300">
        {selectedBooking.details.location}, {selectedBooking.details.nearArea}, {selectedBooking.details.pinCode}, {selectedBooking.details.dist}, {selectedBooking.details.state}, India
      </span>
    </div>

    {/* For Persons */}
    {selectedBooking.details.forPersons?.length > 0 && (
      <div className="flex flex-col space-y-1">
        <span className="font-medium text-gray-800 dark:text-white">
          For Persons:
        </span>
        {selectedBooking.details.forPersons.map((person, idx) => (
          <span key={idx} className="text-gray-600 dark:text-gray-300">
            {person.eventName}: {person.name} ({person.role})
          </span>
        ))}
      </div>
    )}

    {/* Photo/Video Use */}
    <div className="flex items-center space-x-3">
      <Camera className="h-5 w-5 text-purple-600" />
      <span className="text-gray-600 dark:text-gray-300">
        Photo/Video Use: {selectedBooking.details.photoVideoUse ? "Yes" : "No"}
      </span>
    </div>

    {/* Completed At */}
    {selectedBooking.details.completedAt && (
      <div className="flex items-center space-x-3">
        <Calendar className="h-5 w-5 text-green-600" />
        <span className="text-gray-600 dark:text-gray-300">
          Completed At: {new Date(selectedBooking.details.completedAt).toLocaleString()}
        </span>
      </div>
    )}
  </div>
</div>

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
 
{selectedBooking.selectedService.length > 0 && (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mt-6">
    <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
      Selected Services
    </h4>
    <div className="space-y-3">
      {selectedBooking.selectedService.map((service, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-600 rounded-lg"
        >
          <span className="text-gray-800 dark:text-white">
            Service ID: {service.id}
          </span>
          <span className="text-gray-600 dark:text-gray-300">
            Price: ₹{service.price}
          </span>
        </div>
      ))}
    </div>
  </div>
)}

{selectedBooking.details.assignedTeam && selectedBooking.details.assignedTeam.length > 0 && (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mt-6">
    <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
      Assigned Team
    </h4>
    <div className="space-y-3">
      {selectedBooking.details.assignedTeam.map((member, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-600 rounded-lg"
        >
          <div className="flex items-center space-x-3">
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-gray-400" />
            )}
            <div className="flex flex-col">
              <span className="font-medium text-gray-800 dark:text-white">
                {member.name}
              </span>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                Role: {member.role}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              Price: {member.productionPrice ?? member.productionPrice ?? 0}
            </span>
            {member.status && (
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                Status: {member.status}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

<div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mt-6">
  <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
    Required Services Breakdown
  </h4>
  <div className="space-y-3">
    {/* Photography */}
    {selectedBooking.requiredServices.photography.photoTypes.length > 0 && (
      <div>
        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Photography - Photo Types</h5>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
          {selectedBooking.requiredServices.photography.photoTypes.map((photo) => (
            <li key={photo.id}>
              ID: {photo.id}, Price: ₹{photo.price}
            </li>
          ))}
        </ul>
      </div>
    )}
    {selectedBooking.requiredServices.photography.albumTypes.length > 0 && (
      <div>
        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Photography - Album Types</h5>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
          {selectedBooking.requiredServices.photography.albumTypes.map((album) => (
            <li key={album.id}>
              ID: {album.id}, Price: ₹{album.price}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Videography */}
    <div>
      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Videography</h5>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Category: {selectedBooking.requiredServices.videography.videoCategory.id}, Price: ₹{selectedBooking.requiredServices.videography.videoCategory.price}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Quality: {selectedBooking.requiredServices.videography.videoQuality.id}, Price: ₹{selectedBooking.requiredServices.videography.videoQuality.price}
      </p>
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        Duration: {selectedBooking.requiredServices.videography.durationMinutes} minutes
      </p>
      {selectedBooking.requiredServices.videography.extraVideos.length > 0 && (
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
          {selectedBooking.requiredServices.videography.extraVideos.map((video) => (
            <li key={video.id}>ID: {video.id}, Price: ₹{video.price}</li>
          ))}
        </ul>
      )}
    </div>

    {/* Pre-Wedding & Stage Lights */}
    {selectedBooking.requiredServices.preWedding.length > 0 && (
      <div>
        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Pre-Wedding</h5>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
          {selectedBooking.requiredServices.preWedding.map((item) => (
            <li key={item.id}>ID: {item.id}, Price: ₹{item.price}</li>
          ))}
        </ul>
      </div>
    )}

    {selectedBooking.requiredServices.stageLights.length > 0 && (
      <div>
        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-1">Stage Lights</h5>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
          {selectedBooking.requiredServices.stageLights.map((item) => (
            <li key={item.id}>ID: {item.id}, Price: ₹{item.price}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
</div>

              </div>
            </div>
            <PriceCalculate localBooking={selectedBooking} />

            <div className="flex space-x-4 mt-8">
              <button
                onClick={()=>setShowViewModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
  )
}

export default BookingInformation

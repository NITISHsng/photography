"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "@/components/Header";
import { useAppContext } from "@/contexts/AppContext";
import { LogOut } from "lucide-react";
// import { headerType } from "@/contexts/fromType";
interface EventDetail {
  date: string;
  title: string;
  location: string;
  contact: string;
}

// type UserType = "admin" | "operator" | "member";

interface ProfilePageProps {
  
  onLogout: () => void;
}


const ProfilePage: React.FC<ProfilePageProps> = ({onLogout }) => {

  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    currentPage,
    currentUserData,
  } = useAppContext();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);
  const currentUser =currentUserData;

  const normalizeDate = (dateStr: string) => {
    const [d, m, y] = dateStr.split("/");
    return `${parseInt(d)}/${parseInt(m)}/${y}`;
  };

  const highlightDates =
    currentUser?.events?.map((e) => normalizeDate(e.date)) ?? [];

  const formatDate = (date: Date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const isEventDate = (date: Date) => highlightDates.includes(formatDate(date));

  // ✅ Handle date click
  const handleDateClick = (date: Date) => {
    const formatted = formatDate(date);
    const event = currentUser?.events.find(
      (e) => normalizeDate(e.date) === formatted
    );
    if (event) {
      setSelectedEvent(event);
    } else {
      setSelectedEvent(null);
    }
    setSelectedDate(date);
  };

  return (
    <div>
      {/* Header */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        currentPage={currentPage}
      />

      <div className="max-w-4xl mx-auto pt-5 px-6 mt-14 space-y-4">
        {/* Calendar */}
        <div
          // className={p-4 rounded-2xl shadow-lg transition-colors duration-300}
        >
          <div className="flex justify-between items-center">

              <h2 className="text-xl  font-semibold mb-4">
                Your Event Schedule
              </h2>


            <button
              onClick={onLogout}
              className="p-2 flex items-center rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors duration-200"
              aria-label="Logout"
            >
             Logout <LogOut className="h-5 w-5 ml-2" />
            </button>
          </div>

          <div className="flex justify-center">
            <Calendar
              value={selectedDate}
              onClickDay={handleDateClick} // ✅ event click
              onChange={(value) => setSelectedDate(value as Date)}
              tileClassName={({ date }) =>
                isEventDate(date) ? "highlight-event" : ""
              }
            />
          </div>

        </div>

        {/* Event Popup */}
        {selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              // className={p-6 rounded-2xl shadow-lg max-w-md w-full}
            >
              <h3 className="text-xl font-bold mb-4">{selectedEvent?.title}</h3>
              <p>
                <strong>Date:</strong> {selectedEvent?.date}
              </p>
              <p>
                <strong>Location:</strong> {selectedEvent?.location}
              </p>
              <p>
                <strong>Contact:</strong> {selectedEvent?.contact}
              </p>
              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            User Profile
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div>
              <strong>Name:</strong> {currentUser?.name}
            </div>
            <div>
              <strong>Email:</strong> {currentUser?.email}
            </div>
            <div>
              <strong>Phone:</strong> {currentUser?.phone}
            </div>
            <div>
              <strong>Age:</strong> {currentUser?.age}
            </div>
            <div>
              <strong>Gender:</strong> {currentUser?.gender}
            </div>
            <div>
              <strong>Role:</strong> {currentUser?.role}
            </div>
            <div>
              <strong>Location:</strong> {currentUser?.location}
            </div>
            {currentUser?.operatorId && (
              <div>
                <strong>Operator ID:</strong> {currentUser?.operatorId}
              </div>
            )}
            <div>
              <strong>Pincode:</strong> {currentUser?.pincode}
            </div>
            <div>
              <strong>District:</strong> {currentUser?.district}
            </div>
            <div>
              <strong>State:</strong> {currentUser?.state}
            </div>
            <div>
              <strong>Country:</strong> {currentUser?.country}
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Styles */}
      <style jsx global>{`
        .highlight-event {
          background: #3b82f6 !important;
          color: white !important;
          border-radius: 50%;
        }
        .dark .highlight-event {
          background: #facc15 !important;
          color: black !important;
          border-radius: 50%;
        }
        .react-calendar {
          background: white;
          color: black;
          border-radius: 1rem;
          padding: 0.5rem;
        }
        .dark .react-calendar {
          background: #1f2937;
          color: white;
        }
        .react-calendar__tile {
          padding: 0.75rem;
          border-radius: 0.5rem;
        }
        .react-calendar__tile--now {
          background: #e0f2fe !important;
          color: #1d4ed8 !important;
        }
        .dark .react-calendar__tile--now {
          background: #374151 !important;
          color: #facc15 !important;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;

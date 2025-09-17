"use Client";
import React, {useEffect } from "react";
import { BookingData } from "@/contexts/fromType";
import { EventTimeSlot } from "@/contexts/fromType";
import { PersonRole } from "@/contexts/fromType";
import { getEventTypeOptions } from "@/contexts/fromData";
import { calculateDuration } from "@/contexts/fromType";
import { areaType } from "@/contexts/fromType";


interface BasicDetailsProps {
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
  areaDetails: areaType[] | null;
}

const BasicDetails: React.FC<BasicDetailsProps> = ({
  bookingData,
  setBookingData,
  areaDetails,
}) => {
  const handleDetailsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setBookingData((prev) => {
      if (name === "eventType") {
        return {
          ...prev,
          details: {
            ...prev.details,
            [name]: value,
            forPersons: [],
          },
        };
      }

      return {
        ...prev,
        details: {
          ...prev.details,
          [name]: value,
        },
      };
    });
  };


  useEffect(() => {
    if (areaDetails?.[0]?.Message) {
      console.log("Message:", areaDetails[0].Message);
    }
  }, [areaDetails]);


  const handleEventTimeChange =async (
    index: number,
    field: keyof EventTimeSlot,
    value: string
  ) => {
    setBookingData((prev) => {
      const updatedTimes = [...prev.details.eventTimes];
      updatedTimes[index] = {
        ...updatedTimes[index],
        [field]: value,
      };

      return {
        ...prev,
        details: {
          ...prev.details,
          eventTimes: updatedTimes,
        },
      };
    });

  const res=await fetch("/api/hiring", {
      method: "POST",
      body: JSON.stringify({ warmup: true }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);

  };

  const addEventTimeBlock = async () => {
    setBookingData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        eventTimes: [
          ...prev.details.eventTimes,
          { eventDate: "", startTime: "", endTime: "" },
        ],
      },
    }));

    
  };

  const removeEventTimeBlock = (index: number) => {
    setBookingData((prev) => {
      const updatedTimes = [...prev.details.eventTimes];
      updatedTimes.splice(index, 1);
      return {
        ...prev,
        details: {
          ...prev.details,
          eventTimes: updatedTimes,
        },
      };
    });
  };

  const totalDuration = bookingData.details.eventTimes.reduce(
    (sum, slot) => sum + calculateDuration(slot.startTime, slot.endTime),
    0
  );

  type GenerateInputProps = {
    htmlFor: string;
    label: string;
    type: string;
    id: string;
    value: string;
    required: boolean;
    placeholder?: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };


const generateInput = ({
  htmlFor,
  label,
  type,
  id,
  value,
  required,
  placeholder,
  handleInputChange,
}: GenerateInputProps): React.ReactElement => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label} {required && "*"}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={handleInputChange}
        required={required}
        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
        placeholder={placeholder}
      />
    </div>
  );
};

  const handlePersonChange = (
    eventName: string,
    role: PersonRole["role"],
    name: string
  ) => {
    setBookingData((prev) => {
      const updatedPersons = [...prev.details.forPersons];
      const index = updatedPersons.findIndex(
        (p) => p.eventName === eventName && p.role === role
      );

      if (index >= 0) {
        // Update existing
        updatedPersons[index] = { ...updatedPersons[index], name };
      } else {
        // Add new
        updatedPersons.push({ eventName, role, name });
      }

      return {
        ...prev,
        details: {
          ...prev.details,
          forPersons: updatedPersons,
        },
      };
    });
  };

  const handleNearAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArea = e.target.value;

    // find the selected post office details
    const selectedOffice = areaDetails?.[0]?.PostOffice?.find(
      (office) => office.Name === selectedArea
    );

    if (selectedOffice) {
      // ✅ map branchType to location type
      const getLocationType = (branchType: string): string => {
        switch (branchType) {
          case "Branch Post Office":
            return "rural";
          case "Sub Post Office":
            return "semi-urban";
          case "Head Post Office":
            return "urban";
          default:
            return "Unknown";
        }
      };

      const locationType = getLocationType(selectedOffice.BranchType);

      // console.log("BranchType:", selectedOffice.BranchType);
      // console.log("Location Type:", locationType); // ✅ print mapped location

      // ✅ update bookingData with full info
      setBookingData({
        ...bookingData,
        details: {
          ...bookingData.details,
          nearArea: selectedOffice.Name,
          areaType: locationType,
        },
      });
    } else {
      // fallback if no match (just set nearArea)
      setBookingData({
        ...bookingData,
        details: { ...bookingData.details, nearArea: selectedArea },
      });
    }
  };

  return (
    <div>
      {/* Basic Information */}
      <div className="bg-white md:mb-8 mb-5 dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h4 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Basic Information
        </h4>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={bookingData.details.name}
              onChange={handleDetailsChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              placeholder="Your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={bookingData.details.email}
              onChange={handleDetailsChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={bookingData.details.phone}
              onChange={handleDetailsChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              placeholder="+91 98765 43210"
            />
          </div>

          {/* india */}
          <div className="">
            <label
              htmlFor="india"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Country
            </label>
            <input
              type="string"
              id="india"
              name="india"
              readOnly
              // onChange={handleDetailsChange}

              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              placeholder="India"
            />
          </div>

          {/* Pin Code */}
          <div className="">
            <label
              htmlFor="pinCode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Pin Code *
            </label>
            <input
              type="number"
              id="pinCode"
              name="pinCode"
              value={bookingData.details.pinCode}
              onChange={handleDetailsChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              placeholder="Event address pincode 733207"
            />
            {bookingData.details.pinCode.length === 6 && !areaDetails?.[0] && (
              <div className="absolute text-[12px] mt-1 border border-red-400 bg-red-100 text-red-700 px-4 py-1 rounded">
                Sorry, this area our service is not available
              </div>
            )}
          </div>

          <div className="">
            <label
              htmlFor="nearArea"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Near Area *
            </label>

            <select
              id="nearArea"
              name="nearArea"
              value={bookingData.details.nearArea}
              onChange={handleNearAreaChange} // ✅ using function
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            >
              <option value="">-- Select Area --</option>
              {areaDetails?.[0]?.PostOffice?.map((office, index) => (
                <option key={index} value={office.Name}>
                  {office.Name}
                </option>
              ))}
            </select>
          </div>

          {/* location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Event Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={bookingData.details.location}
              onChange={handleDetailsChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
              placeholder="Event venue or address"
            />
          </div>

          {/* Event Type */}
          <div>
            <label
              htmlFor="eventType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {bookingData.details.category === "event"
                ? "Event Type"
                : `Type of ${bookingData.details.category}`}{" "}
              *
            </label>
            <select
              id="eventType"
              name="eventType"
              value={bookingData.details.eventType}
              onChange={handleDetailsChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
            >
              <option value="">
                Select{" "}
                {bookingData.details.category === "event"
                  ? "event type"
                  : `type of ${bookingData.details.category}`}
              </option>
              {getEventTypeOptions(bookingData.details.category).map(
                (option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>

          {bookingData.details.pinCode.length === 6 && (
            <div className="">
              <label
                htmlFor="dist"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                District *
              </label>
              <input
                type="text"
                id="dist"
                name="dist"
                value={bookingData.details.dist}
                onChange={handleDetailsChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                placeholder="District"
              />
            </div>
          )}

          {bookingData.details.pinCode.length === 6 && (
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                State *
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={bookingData.details.state}
                onChange={handleDetailsChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                placeholder="State"
              />
            </div>
          )}
        </div>
      </div>

      {/* Event Details */}

      {bookingData.details.eventType && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          {[
            "wedding",
            "engagementCeremony",
            "reception",
            "preWedding",
          ].includes(bookingData.details.eventType) && (
            <div className="grid md:grid-cols-2 gap-6">
              {generateInput({
                htmlFor: "groomName",
                label: "Groom Name",
                type: "text",
                id: "groomName",
                value:
                  bookingData.details.forPersons.find(
                    (p) =>
                      p.eventName === bookingData.details.eventType &&
                      p.role === "groom"
                  )?.name || "",
                required: true,
                placeholder: "Groom full name",
                handleInputChange: (e) =>
                  handlePersonChange(
                    bookingData.details.eventType,
                    "groom",
                    e.target.value
                  ),
              })}

              {generateInput({
                htmlFor: "brideName",
                label: "Bride Name",
                type: "text",
                id: "brideName",
                value:
                  bookingData.details.forPersons.find(
                    (p) =>
                      p.eventName === bookingData.details.eventType &&
                      p.role === "bride"
                  )?.name || "",
                required: true,
                placeholder: "Bride full name",
                handleInputChange: (e) =>
                  handlePersonChange(
                    bookingData.details.eventType,
                    "bride",
                    e.target.value
                  ),
              })}
            </div>
          )}
          {(bookingData.details.eventType === "riceCeremony" ||
            bookingData.details.eventType === "babyPhotography") && (
            <div className="grid gap-6">
              {generateInput({
                htmlFor: "babyName",
                label: "Baby Name",
                type: "text",
                id: "babyName",
                value:
                  bookingData.details.forPersons.find(
                    (p) =>
                      p.eventName === bookingData.details.eventType &&
                      p.role === "babyName"
                  )?.name || "",
                required: true,
                placeholder: "Baby Name",
                handleInputChange: (e) =>
                  handlePersonChange(
                    bookingData.details.eventType,
                    "babyName",
                    e.target.value
                  ),
              })}
            </div>
          )}

          {bookingData.details.eventType === "birthday" && (
            <div className="grid gap-6">
              {generateInput({
                htmlFor: "birthday",
                label: "Name of Birthday Person",
                type: "text",
                id: "birthdayName",
                value:
                  bookingData.details.forPersons.find(
                    (p) =>
                      p.eventName === bookingData.details.eventType &&
                      p.role === "birthday-person"
                  )?.name || "",
                required: true,
                placeholder: "Name of Birthday Person",
                handleInputChange: (e) =>
                  handlePersonChange(
                    bookingData.details.eventType,
                    "birthday-person",
                    e.target.value
                  ),
              })}
            </div>
          )}

          <h2 className="text-xl font-bold my-2 text-gray-800 dark:text-white">
            Event Schedule
          </h2>

          {bookingData.details.eventTimes.map((slot, index) => {
            const duration = calculateDuration(slot.startTime, slot.endTime);

            return (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 mb-6 pb-3 bg-white relative  dark:bg-gray-800 p-2"
              >
                {/* Event Date */}
                <div>
                  <label
                    htmlFor={`eventDate-${index}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id={`eventDate-${index}`}
                    name={`eventDate-${index}`}
                    value={slot.eventDate}
                    min={
                      new Date(Date.now() + 86400000)
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      handleEventTimeChange(index, "eventDate", e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* Start Time */}
                <div>
                  <label
                    htmlFor={`startTime-${index}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Start Time *
                  </label>
                  <input
                    type="time"
                    id={`startTime-${index}`}
                    name={`startTime-${index}`}
                    value={slot.startTime}
                    onChange={(e) =>
                      handleEventTimeChange(index, "startTime", e.target.value)
                    }
                    className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* End Time */}
                <div>
                  <label
                    htmlFor={`endTime-${index}`}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    End Time *
                  </label>
                  <input
                    type="time"
                    id={`endTime-${index}`}
                    name={`endTime-${index}`}
                    value={slot.endTime}
                    onChange={(e) =>
                      handleEventTimeChange(index, "endTime", e.target.value)
                    }
                    className="w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* Duration Display */}
                {duration > 0 && (
                  <div className="md:col-span-3 text-sm text-blue-700 dark:text-blue-300 mt-2">
                    Duration: {duration} hour
                    {duration !== 1 ? "s" : ""}
                  </div>
                )}

                {/* Remove Button */}
                {bookingData.details.eventTimes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEventTimeBlock(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                    title="Remove this slot"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Another Slot Button */}
          <div
            className={`text-right mb-4 md:flex  ${
              totalDuration ? "justify-between" : "justify-end"
            }`}
          >
            <button
              type="button"
              onClick={addEventTimeBlock}
              className="text-sm md:order-2 order-1 text-blue-600 dark:text-blue-400 hover:underline"
            >
              + Add another date/time slot
            </button>

            {/* Total Duration */}
            {totalDuration > 0 && (
              <div className="text-right md:order-1 order-2 font-extralight text-gray-700 dark:text-gray-200">
                Total Event Duration: {totalDuration.toFixed(2)} hours
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicDetails;

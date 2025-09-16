"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Check,
  Star,
  Calendar,
  DollarSign,
  Send,
  CheckCircle,
} from "lucide-react";

import { useAppContext } from "@/contexts/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { initialBookingData,areaType } from "@/contexts/fromType";

import { BookingData} from "@/contexts/fromType";
import { categories } from "@/contexts/fromData";
import { packages } from "@/contexts/fromData";

import BasicDetails from "@/components/fromComponents/BasicDetails";
import Services from "@/components/fromComponents/Services";
import PhotoVideoOptions from "@/components/fromComponents/PhotoVideoOptions";
import Lights from "@/components/fromComponents/Lights";
import PriceCalculate from "@/components/sub_Components/PriceCalculate";
import { headerType } from "@/contexts/fromType";



const HiringPage: React.FC<headerType> = () => {
  const [bookingData, setBookingData] =
    useState<BookingData>(initialBookingData);
  
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    currentPage,
  } = useAppContext();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  

  const handleBooking = (packageId: string) => {
    setBookingData((prev) => ({
      ...initialBookingData,
      details: {
        ...prev.details,
        package: packageId,
      },
    }));

    const bookingElement = document.getElementById("booking-form");
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dateError, setDateError] = useState("");

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

  // Validate booking date (minimum 1 day gap)
  const validateDate = (selectedDate: string) => {
    if (!selectedDate) {
      setDateError("Event date is required for booking.");
      return false;
    }

    const today = new Date();
    const bookingDate = new Date(selectedDate);
    const timeDiff = bookingDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 1) {
      setDateError(
        "Emergency bookings not allowed. Minimum 1 day advance booking required."
      );
      return false;
    } else {
      setDateError("");
      return true;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validate event date at least 1 day ahead
    const firstEventDate = bookingData.details.eventTimes[0]?.eventDate;
    if (!validateDate(firstEventDate)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/hiring", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        alert(error || "Failed to submit form");
        return;
      }

      setIsSubmitted(true);

      // reset form
      setBookingData(initialBookingData);

      setTimeout(() => setIsSubmitted(false), 5000);
      const bookingElement = document.getElementById("booking-form");
      if (bookingElement) {
        bookingElement.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // pincode to find details

const [areaDetails, setDetails] = useState< areaType | null>(null);

  useEffect(() => {
    const pin = bookingData?.details?.pinCode;

    if (pin && pin.length !== 6) {
      return;
    }

    const fetchDetails = async () => {

      setDetails(null);

      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await res.json();

        if (data[0].Status === "Success") {
          setDetails(data);
          setBookingData((prev) => {
            return {
              ...initialBookingData,
              details: {
                ...prev.details,
                dist: data?.[0]?.PostOffice?.[0].District,
                state: data?.[0]?.PostOffice?.[0].State,
                nearArea: "",
              },
            };
          });
        } else {
          console.log("No details found for this PIN code.");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchDetails();
  }, [bookingData?.details?.pinCode]);

  const getFormTitle = () => {
    switch (bookingData.details.category) {
      case "cameraman":
        return "Book Cameraman";
      case "equipment":
        return "Rent Equipment";
      case "editor":
        return "Hire Editor";
      case "event":
        return "Book Complete Event";
      default:
        return "Book Event";
    }
  };

  const getButtonText = () => {
    switch (bookingData.details.category) {
      case "cameraman":
        return "Book Cameraman";
      case "equipment":
        return "Rent Equipment";
      case "editor":
        return "Hire Editor";
      case "event":
        return "Book Complete Event";
      default:
        return "Book Event";
    }
  };

  const [openId, setOpenId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };



 
  return (
    <div
      className="min-h-screen transition-colors duration-300"
    >
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          currentPage={currentPage}
        />

        <div className="pt-8 min-h-screen bg-white dark:bg-gray-900">
          {/* heero section */}
          <div
            style={{
              backgroundImage:
                "url('https://media.weddingz.in/images/7925b20c21b1f52bdb5e827c783b527f/Bengali-marriage-rituals-5.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 py-16"
          >
            {/* Dark center overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,.6)_100%,white_100%) dark:bg-[radial-gradient(circle,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,1)_100%)]"></div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center ">
                <h1 className="text-4xl md:text-5xl text-black/70 dark:text-white font-bold mb-6">
                  <span className="">
                    Professional Video Services
                  </span>
                </h1>
                <h2 className="text-2xl text-black/60 dark:text-white md:text-3xl font-semibold mb-6">
                  Customizable Packages for Every Need
                </h2>
                <p className="text-xl text-black/40 dark:text-gray-200 max-w-3xl mx-auto">
                  Choose exactly what you need from our comprehensive range of
                  services. Mix and match to create your perfect package.
                </p>
              </div>
            </div>
          </div>

          {/* Category Selection */}
          <div className="py-4 md:py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-2 sm:px-6 lg:px-8">
              <div
                className="flex justify-center md:mb-10 mb-6
              "
              >
                <div className="grid grid-cols-2 md:grid-cols-4 w-[100%] gap-4 max-w-[800px] bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          // setbookingData.details.category(category.id);
                          setBookingData((prev) => ({
                            ...prev,
                            details: {
                              ...prev.details,
                              category: category.id,
                            },
                          }));
                          // setShowPriceCalculator(false);
                        }}
                        className={`flex justify-center items-center space-x-2 px-2 py-2 md:py-3 rounded-xl min-h-[65px] md:min-h-[20px] bg-white dark:bg-black transition-all duration-200 font-semibold ${
                          bookingData.details.category === category.id
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "text-gray-600 bg-slate-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span>{category.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Packages Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                <h3 className="text-2xl md:hidden font-bold text-center mt-8 text-gray-800 dark:text-white">
                  OUR PACKAGES
                </h3>
                {packages[
                  bookingData.details.category as keyof typeof packages
                ].map((pkg) => {
                  const isOpen = openId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      className={`relative bg-white ring-2 dark:bg-gray-800 rounded-xl m-3 md:mm-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                        pkg.popular
                          ? "ring-blue-500 scale-103"
                          : "dark:ring-white/30 ring-black/10"
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-current" />
                            <span>Most Popular</span>
                          </div>
                        </div>
                      )}

                      <div className="p-4 md:p-8">
                        <div className="text-center mb-6">
                          <h3 className="md:text-2xl text-[21px] whitespace-nowrap overflow-hidden text-ellipsis font-bold text-blue-600 dark:text-blue-400">
                            {pkg.name}
                          </h3>

                          {/* Conditional Details */}
                          <div
                            className={`${
                              isOpen ? "block" : "hidden"
                            } lg:block`}
                          >
                            {/* <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                {pkg.price}
                              </div> */}

                            <div className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                              {pkg.duration}
                            </div>

                            <ul className="space-y-3 mb-8">
                              {pkg.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-3"
                                >
                                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {/* Toggle Button - hidden on lg+ */}
                        <button
                          onClick={() => toggleDetails(pkg.id)}
                          className="lg:hidden w-full py-2 px-6 mb-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {isOpen ? "Hide Details" : "Show Details"}
                        </button>

                        <button
                          onClick={() => handleBooking(pkg.id)}
                          className={`w-full py-2 md:py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-black/70 hover:from-blue-700 hover:to-purple-700 dark:text-white shadow-lg hover:shadow-xl ${
                            bookingData.details.package === pkg.id
                              ? "border-2 border-blue dark:border-blue bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                              : "border-1 border-blue text-black dark:border-blue"
                          }`}
                        >
                          <Calendar className="h-5 w-5" />
                          <span>Book Now</span>
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {bookingData.details.package && (
                <div className="mb-4">
                  {/* Booking Section */}

                  <div
                    id="booking-form"
                    className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {getFormTitle()}
                        </span>
                      </h3>
                      {getFormTitle() == "Book Complete Event" && (
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          Fill out the form below and select your required
                          services
                        </p>
                      )}

                      {getFormTitle() !== "Book Complete Event" && (
                        <p className="text-lg text-red-600 dark:text-red-600">
                          This Service is Currently not Available
                        </p>
                      )}
                    </div>
                    {bookingData.details.category == "event" && (
                      <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto space-y-8"
                      >
                        {/* basic details */}
                        <BasicDetails
                          bookingData={bookingData}
                          setBookingData={setBookingData}
                          areaDetails={areaDetails ? [areaDetails] : []}
                        />
                        {/* Services Selection */}
                        <Services
                          bookingData={bookingData}
                          setBookingData={setBookingData}
                        />

                        {/* Professional Requirements */}

                        {bookingData.selectedService.some((s) =>
                          [
                            "photography",
                            "drone-coverage",
                            "videography",
                            "stage-lighting",
                            "live-streaming",
                            "led-screen",
                          ].includes(s.id)
                        ) && (
                          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                            <h4 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
                              Professional Requirements
                            </h4>

                            {/* photography */}
                            <PhotoVideoOptions
                              bookingData={bookingData}
                              setBookingData={setBookingData}
                            />
                            {/* Stage lights */}
                            <Lights
                              bookingData={bookingData}
                              setBookingData={setBookingData}
                            />

                            {/* //message box */}
                            <div>
                              <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                              >
                                Message (Optional)
                              </label>
                              <textarea
                                id="message"
                                name="message"
                                value={bookingData.details.message}
                                onChange={handleDetailsChange}
                                rows={4} // you can adjust height
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                                placeholder="Write something for your service"
                              />
                            </div>

                            {/* permition photo video */}
                            {bookingData.selectedService.some((s) =>
                              [
                                "photography",
                                "drone-coverage",
                                "videography",
                              ].includes(s.id)
                            ) && (
                              <div className="w-full flex justify-center">
                                <div className="bg-gradient-to-r w-fit from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 py-2 rounded-xl border border-blue-200 mt-2 dark:border-blue-300">
                                  <label className="flex items-start space-x-3 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={
                                        bookingData.details.photoVideoUse
                                      }
                                      onChange={(e) =>
                                        setBookingData((prev) => ({
                                          ...prev,
                                          details: {
                                            ...prev.details,
                                            photoVideoUse: e.target.checked,
                                          },
                                        }))
                                      }
                                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                      Allow photos/videos for social media.
                                    </span>
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        )}


                        {/* price Calculate */}

                         {bookingData.selectedService.length > 0 && (
                          <PriceCalculate localBooking={bookingData}/>
                         )}






                        {isSubmitted && (
                          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg flex items-center space-x-3 max-w-2xl mx-auto">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-green-700 dark:text-green-300">
                              📸 Thank you for booking our services! Our team
                              will connect with you as soon as possible to
                              confirm the details and next steps.
                            </span>
                          </div>
                        )}
                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={
                            isSubmitting ||
                            dateError !== "" ||
                            !bookingData.selectedService.length
                          }
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              <span>{getButtonText()}</span>
                            </>
                          )}
                        </button>

                        {!bookingData.selectedService.length && (
                          <div className="text-center text-red-600 dark:text-red-400 text-sm">
                            Please select at least one service
                          </div>
                        )}
                      </form>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                      <div>
                        <DollarSign className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                          Duration-Based Pricing
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Fair pricing based on actual event duration. Extended
                          events get proportional pricing adjustments.
                        </p>
                      </div>
                      <div>
                        <Calendar className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                          Mandatory Advance Booking
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          Minimum 1 day advance booking required with date
                          selection mandatory for quality assurance.
                        </p>
                      </div>
                      <div>
                        <Check className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                          Multiple Options Available
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                       Mix and match lights and album types to create the package that’s perfect for you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* <Demo_work /> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HiringPage;

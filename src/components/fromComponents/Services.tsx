import React from "react";
import { BookingData } from "@/contexts/fromType";
import { serviceOptions, preWeddingOptions, servicesPreWedding } from "@/contexts/fromData";
import { PriceHandeler } from "@/contexts/fromData";
interface ServicesProps {
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
}

const Services: React.FC<ServicesProps> = ({ bookingData, setBookingData }) => {
  const servicesToRender =
    bookingData.details.eventType === "preWedding"
      ? servicesPreWedding
      : serviceOptions.event;

  return (
    <div>
      {Array.isArray(bookingData.details.eventTimes) && 
       bookingData.details.eventTimes[0]?.endTime && 
        bookingData.details.pinCode.length ===6  &&
       bookingData.details.eventTimes[0].endTime !== "" && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="mb-6">
            <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              Required Services
            </h5>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicesToRender.map((service) => {
                const IconComponent = service.icon;
                const isSelected = bookingData.selectedService.some(
                  (a) => a.id === service.id
                );
          const {discount, finalPrice }=PriceHandeler(
                        service.price, 
                        service.discount,
                        bookingData.details.package,
                        bookingData.details.areaType,);
  
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() =>
                      setBookingData((prev) => {
                        const alreadySelected = prev.selectedService.some(
                          (a) => a.id === service.id
                        );
                      
                        return {
                          ...prev,
                          selectedService: alreadySelected
                            ? prev.selectedService.filter((s) => s.id !== service.id)
                            : [...prev.selectedService, { id: service.id, price: finalPrice }],
                        };
                      })
                    }
                    className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                    }`}
                  >
                    <IconComponent className="h-5 w-5 text-blue-600 shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-800 dark:text-white">
                        {service.name}{" "}
                        <span className="m-2 px-2 rounded-2xl text-blue-600 font-medium text-lg bg-blue-300 ">
                          {discount}%
                        </span>
                        <span className="m-2 px-2 rounded-2xl text-blue-600 font-medium text-lg bg-blue-300 ">
                         {finalPrice}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {service.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {bookingData.details.eventType === "preWedding" && (
            <div>
              <h6 className="font-medium mb-3">Pre Wedding Shooting</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {preWeddingOptions.map((opt) => {
                  const isSelected = bookingData.requiredServices.preWedding.some(
                    (s) => s.id === opt.id
                  );
            const { mrp, discount, finalPrice } = PriceHandeler(
                                 opt.price,
                                 opt.discount,
                                 bookingData.details.package,
                                 bookingData.details.areaType
                               );
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setBookingData((prev) => {
                          const alreadySelected = prev.requiredServices.preWedding.some(
                            (s) => s.id === opt.id
                          );

                          return {
                            ...prev,
                            requiredServices: {
                              ...prev.requiredServices,
                              preWedding: alreadySelected
                                ? prev.requiredServices.preWedding.filter((s) => s.id !== opt.id)
                                : [...prev.requiredServices.preWedding, { id: opt.id, price: finalPrice }],
                            },
                          };
                        })
                      }
                      className={`p-4 rounded-xl border-2 flex flex-col text-center gap-1 transition-all ${
                        isSelected
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600"
                      }`}
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{opt.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</div>
                                         {/* Price Section */}
                    <div className="mt-1 justify-center flex items-center space-x-2">
                      {/* MRP */}
                      <span className="text-xs text-gray-500 line-through">
                        ₹{mrp.toLocaleString()}
                      </span>

                      {/* Discount Badge */}
                      <span className="px-2 py-0.5 text-[12px] font-semibold bg-purple-100 text-purple-600 rounded-full">
                        {discount}% OFF
                      </span>

                      {/* Final Price */}
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        {finalPrice? finalPrice : "Free"}
                      </span>
                    </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;

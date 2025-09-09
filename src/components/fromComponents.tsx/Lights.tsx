import React from "react";
import { BookingData } from "@/contexts/fromType";
import { lightOptions } from "@/contexts/fromData";
import { Lightbulb } from "lucide-react";
import { PriceHandeler } from "@/contexts/fromData";
interface LightsProps {
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
}

const Lights: React.FC<LightsProps> = ({ bookingData, setBookingData }) => {
  return (
    <div>
      {bookingData.selectedService.some((a) => a.id === "stage-lighting") && (
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Stage Lights *
          </h5>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lightOptions.map((light) => {
              const isSelected = bookingData.requiredServices.stageLights.some(
                (e) => e.id === light.id
              );

              const { mrp, discount, finalPrice } = PriceHandeler(
                light.price,
                light.discount,
                bookingData.details.package,
                bookingData.details.areaType,

              );

              return (
                <div
                  key={light.id}
                  onClick={() =>
                    setBookingData((prev) => {
                      const alreadySelected =
                        prev.requiredServices.stageLights.some(
                          (e) => e.id === light.id
                        );

                      return {
                        ...prev,
                        requiredServices: {
                          ...prev.requiredServices,
                          stageLights: alreadySelected
                            ? prev.requiredServices.stageLights.filter(
                                (r) => r.id !== light.id
                              ) 
                            : [
                                ...prev.requiredServices.stageLights,
                                { id: light.id, price: finalPrice }, // ✅ fixed
                              ], // add
                        },
                      };
                    })
                  }
                  className={`flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600"
                  }`}
                >
                  <Lightbulb className="h-5 w-5 text-purple-600" />

                  <div className="flex-1">
                    {/* Title */}
                    <div className="font-medium text-gray-800 dark:text-white">
                      {light.name}
                    </div>

                    {/* Description */}
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {light.description}
                    </div>

                    {/* Price Section */}
                    <div className="mt-1 flex items-center space-x-2">
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lights;

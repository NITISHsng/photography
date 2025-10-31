import React from "react";
import { BookingWithId } from "@/contexts/fromType";
import { droneOptions } from "@/contexts/fromData";
import { PriceHandeler } from "@/contexts/fromData";

interface droneOptionProps {
  bookingData: BookingWithId;
  setBookingData: React.Dispatch<React.SetStateAction<BookingWithId>>;
}

const Drone: React.FC<droneOptionProps> = ({ bookingData, setBookingData }) => {
  return (
    <div className="my-3">
      <h4 className="text-blue-700 dark:text-blue-400 mb-2">Drone Options</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {droneOptions.map((drone) => {
          const isSelected = bookingData.requiredServices.droneselected.some(
            (e) => e.id === drone.id
          );
          const { mrp, discount, finalPrice } = PriceHandeler(
            drone.price,
            drone.discount,
            bookingData.details.package,
            bookingData.details.areaType
          );
          return (
            <button
              key={drone.id}
              type="button"
              onClick={() =>
                setBookingData((prev) => {
                  const alreadySelected = prev.requiredServices.droneselected.some(
                    (e) => e.id === drone.id
                  );

                  return {
                    ...prev,
                    requiredServices: {
                      ...prev.requiredServices,
                      droneselected: alreadySelected
                        ? prev.requiredServices.droneselected.filter(
                            (r) => r.id !== drone.id
                          )
                        : [
                            ...prev.requiredServices.droneselected,
                            { id: drone.id, price: finalPrice },
                          ],
                    },
                  };
                })
              }
              className={`p-4 rounded-xl border-2 flex flex-col text-center gap-1 transition-all ${
                isSelected
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {drone.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {drone.desc}
              </div>
              <div>
                <span className="text-xs text-gray-500 line-through">₹{mrp}</span>
                <span className="px-2 mx-2 py-0.5 text-[12px] font-semibold bg-blue-100 text-blue-800 rounded-full">
                  {discount}% OFF
                </span>
                <span className="text-sm font-bold text-blue-600">
                  {finalPrice === 0 ? "Free" : `₹${finalPrice}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Drone;

import React from "react";
import { BookingData } from "@/contexts/fromType";
import { ledScreenOptions } from "@/contexts/fromData";
import { PriceHandeler } from "@/contexts/fromData";

interface ledScreenProps {
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
}

const LEDScreen: React.FC<ledScreenProps> = ({ bookingData, setBookingData }) => {
  return (
    <div className="my-3">
      <h4 className="text-green-700 dark:text-green-400 mb-2">LED Options</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ledScreenOptions.map((led) => {
          const isSelected = bookingData.requiredServices.ledscreen.some(
            (e) => e.id === led.id
          );
          const { mrp, discount, finalPrice } = PriceHandeler(
            led.price,
            led.discount,
            bookingData.details.package,
            bookingData.details.areaType
          );
          return (
            <button
              key={led.id}
              type="button"
              onClick={() =>
                setBookingData((prev) => {
                  const alreadySelected = prev.requiredServices.ledscreen.some(
                    (e) => e.id === led.id
                  );

                  return {
                    ...prev,
                    requiredServices: {
                      ...prev.requiredServices,
                      ledscreen: alreadySelected
                        ? prev.requiredServices.ledscreen.filter(
                            (r) => r.id !== led.id
                          )
                        : [
                            ...prev.requiredServices.ledscreen,
                            { id: led.id, price: finalPrice },
                          ],
                    },
                  };
                })
              }
              className={`p-4 rounded-xl border-2 flex flex-col text-center gap-1 transition-all ${
                isSelected
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600"
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {led.label}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {led.desc}
              </div>
              <div>
                <span className="text-xs text-gray-500 line-through">₹{mrp}</span>
                <span className="px-2 mx-2 py-0.5 text-[12px] font-semibold bg-green-100 text-green-800 rounded-full">
                  {discount}% OFF
                </span>
                <span className="text-sm font-bold text-green-600">
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

export default LEDScreen;

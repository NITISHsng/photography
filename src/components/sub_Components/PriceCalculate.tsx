"use client"
import React, { useEffect, useState } from "react";
import { videoCategory } from "@/contexts/fromData";
import { calculateDuration } from "@/contexts/fromType";
import { PriceHandeler } from "@/contexts/fromData";
import { BookingData, ExpandablePriceProps } from "@/contexts/fromType";

type Props = {
  localBooking: BookingData;
};

const PriceCalculate = ({ localBooking }: Props) => {
  const [bookingData, setLocalBooking] = useState<BookingData>(localBooking);
  useEffect(() => {
    setLocalBooking(localBooking); 
  }, [localBooking]);


const calculateServicePrice = (bookingData: BookingData) => {
  let baseServiceCost = 0;
  let additionalCosts = 0;
  let videoDurationAmount = 0;
  let daysAndEventDueration = 0;
  // Sum prices of all selected services
  baseServiceCost = bookingData.selectedService.reduce(
    (sum, service) => sum + service.price,
    0
  );

  // service price
  if (bookingData.requiredServices.photography.photoTypes) {
    additionalCosts +=
      bookingData.requiredServices.photography.photoTypes.reduce(
        (sum, v) => sum + v.price,
        0
      );
  }

  // album  price
  if (bookingData.requiredServices.photography.albumTypes) {
    additionalCosts +=
      bookingData.requiredServices.photography.albumTypes.reduce(
        (sum, v) => sum + v.price,
        0
      );
  }

  // video Category price
  if (bookingData.requiredServices.videography.videoCategory) {
        additionalCosts += bookingData.requiredServices.videography.videoCategory.price;
  }


  if (
    bookingData.selectedService.some((a) => a.id === "videography") &&
    bookingData.requiredServices.videography.durationMinutes > 15
  ) {
    switch (bookingData.requiredServices.videography.videoCategory.id) {
      case "standard":
        videoDurationAmount =
          (bookingData.requiredServices.videography.durationMinutes - 15) *
          videoCategory[0].parMin;
        break;
      case "classic":
        videoDurationAmount =
          (bookingData.requiredServices.videography.durationMinutes - 15) *
          videoCategory[1].parMin;
        break;
      case "cinematic":
        videoDurationAmount =
          (bookingData.requiredServices.videography.durationMinutes - 15) *
          videoCategory[2].parMin;
        break;
    }
    additionalCosts += videoDurationAmount;
  }

  // video quality price
  if (bookingData.requiredServices.videography.videoQuality) {
    additionalCosts += bookingData.requiredServices.videography.videoQuality.price;
  }
  // extra video price
  if (bookingData.requiredServices.videography.extraVideos) {
    additionalCosts +=
      bookingData.requiredServices.videography.extraVideos.reduce(
        (sum, v) => sum + v.price,
        0
      );
  }

  // lights  price
  if (bookingData.requiredServices.stageLights) {
    additionalCosts += bookingData.requiredServices.stageLights.reduce(
      (sum, v) => sum + v.price,
      0
    );
  }

  // Example: if you want to factor in preWedding
  if (bookingData.requiredServices.preWedding) {
    additionalCosts += bookingData.requiredServices.preWedding.reduce(
      (sum, v) => sum + v.price,
      0
    );
  }

  const totalDuration = bookingData.details.eventTimes.reduce(
    (sum, slot) => sum + calculateDuration(slot.startTime, slot.endTime),
    0
  );

  if (totalDuration > 5) {
    const extraHours = (totalDuration - 5) * 200;
    const {finalPrice } = PriceHandeler(
      extraHours,
      0,
      bookingData.details.package,
      bookingData.details.areaType
    );
    daysAndEventDueration += finalPrice;
    baseServiceCost += finalPrice;
  }

  // count unique event dates
  const slotCount = new Set(
    bookingData.details.eventTimes.map((slot) => slot.eventDate)
  ).size;

  if (slotCount > 1) {
    const eachSlot = (slotCount - 1) * 1000;
    const { finalPrice } = PriceHandeler(
      eachSlot,
      0,
      bookingData.details.package,
      bookingData.details.areaType
    );
    daysAndEventDueration += finalPrice;
    baseServiceCost += finalPrice;
  }

  const totalAmount = baseServiceCost + additionalCosts;
  bookingData.details.totalAmount = totalAmount;
  return {
    baseServiceCost,
    additionalCosts,
    totalDuration,
    totalAmount,
    videoDurationAmount,
    daysAndEventDueration,
  };
};


 const ExpandablePrice: React.FC<ExpandablePriceProps> = ({
    title,
    items,
  }) => {
    const [open, setOpen] = useState(false);
    const itemArray = Array.isArray(items) ? items : [items];
    const totalPrice = itemArray.reduce((sum, s) => sum + s.price, 0);

    return (
      <div
        className="border border-black/20 rounded-lg px-2 py-1 cursor-pointer text-white/30 shadow-sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* summary row */}
        <div className="flex justify-between font-medium text-gray-600 dark:text-gray-400">
          <span>{title}</span>
          <span>₹{totalPrice}</span>
        </div>

        {/* expanded items */}
        {open && (
          <div className="mt-2 space-y-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {itemArray.map((item) => (
              <div key={item.id} className="flex justify-between pl-3">
                <span>{item.id}</span>
                <span>₹{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

useEffect(() => {

  console.log("bookingData")
  console.log(bookingData)
}, [bookingData])

  return (
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-700 ">
                              <div className="text-center mb-4">
                                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                  💰 Price Calculator
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  See how your choices affect the total price
                                </p>
                              </div>

                              <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Selected Services:
                                  </h5>
                                  <div className="space-y-1">
                                    {bookingData.selectedService.map(
                                      (serviceId) => (
                                        <div
                                          key={serviceId.id}
                                          className="flex justify-between items-center text-xs"
                                        >
                                          <span className="text-gray-600 dark:text-gray-400">
                                            {serviceId.id}
                                          </span>
                                          <span className="font-medium text-gray-800 dark:text-white">
                                            ₹{serviceId.price}
                                          </span>
                                        </div>
                                      )
                                    )}
                                    {calculateServicePrice(bookingData).daysAndEventDueration>0 && (
                                    <div className="flex justify-between items-center text-xs">
                                      <span className="text-gray-600 dark:text-gray-400">Day(s) & Duration</span>
                                      <span className="font-medium text-gray-800 dark:text-white">
                                        ₹
                                        {
                                          calculateServicePrice(bookingData)
                                            .daysAndEventDueration
                                        }
                                      </span>
                                    </div>
                                    )

                                    }


                                  </div>
                                  <hr className="mt-2" />
                                  <div className="text-right mt-1">
                                    Total Base Service Cost={" "}
                                    {
                                      calculateServicePrice(bookingData)
                                        .baseServiceCost
                                    }
                                  </div>
                                </div>

                                <div>
                                  <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Add-ons & Extras:
                                  </h5>
                                  <div className="space-y-1 text-xs">
                                    {bookingData.requiredServices.preWedding.length > 0 && (
                                      <ExpandablePrice
                                        title="Pre weddding"
                                        items={
                                          bookingData.requiredServices.preWedding
                                        }
                                      />
                                    )}
                                    {bookingData.requiredServices.photography
                                      .photoTypes.length > 0 && (
                                      <ExpandablePrice
                                        title="Photo Types"
                                        items={
                                          bookingData.requiredServices
                                            .photography.photoTypes
                                        }
                                      />
                                    )}
                                    {bookingData.requiredServices.photography
                                      .albumTypes.length > 0 && (
                                      <ExpandablePrice
                                        title="Album"
                                        items={
                                          bookingData.requiredServices
                                            .photography.albumTypes
                                        }
                                      />
                                    )}
                                    {bookingData.selectedService.some(
                                      (s) => s.id === "videography"
                                    ) && (
                                      <ExpandablePrice
                                        title="Video Package"
                                        items={
                                          bookingData.requiredServices
                                            .videography.videoCategory
                                        }
                                      />
                                    )}
                                    {bookingData.selectedService.some(
                                      (s) => s.id === "videography"
                                    ) && (
                                      <ExpandablePrice
                                        title="Video Quality"
                                        items={
                                          bookingData.requiredServices
                                            .videography.videoQuality
                                        }
                                      />
                                    )}
                                    {bookingData.requiredServices.videography
                                      .extraVideos.length > 0 && (
                                      <ExpandablePrice
                                        title="Extra Video"
                                        items={
                                          bookingData.requiredServices
                                            .videography.extraVideos
                                        }
                                      />
                                    )}
                                    {bookingData.requiredServices.stageLights
                                      .length > 0 && (
                                      <ExpandablePrice
                                        title="Lights"
                                        items={
                                          bookingData.requiredServices
                                            .stageLights
                                        }
                                      />
                                    )}

                                    {bookingData.requiredServices.videography
                                      .durationMinutes > 15 && (
                                      <div className="border border-black/20 rounded-lg px-2 py-1 cursor-pointer text-white/30 shadow-sm">
                                        <div className="flex justify-between font-medium text-gray-600 dark:text-gray-400">
                                          <span>
                                            Extra Video Duration{" "}
                                            <span className="text-sm">15+ 
                                              {bookingData.requiredServices
                                                .videography.durationMinutes -
                                                15}{" "}
                                            </span>
                                          </span>
                                          <span>
                                            ₹
                                            {
                                              calculateServicePrice(bookingData)
                                                .videoDurationAmount
                                            }
                                          </span>
                                        </div>
                                      </div>
                                    )}

                                    <hr />
                                    <div className="text-right mt-3">
                                      Additional Costs={" "}
                                      {
                                        calculateServicePrice(bookingData)
                                          .additionalCosts
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div></div>
                              <div className="mt-3">
                                <div className="text-center">
                                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                    Estimated Total Price
                                  </h4>
                                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                                    ₹
                                    {
                                      calculateServicePrice(bookingData)
                                        .totalAmount
                                    }
                                  </div>

                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                    *Final price may vary based on specific
                                    requirements and location
                                  </p>
                                </div>

                                <div className="text-center text-sm mt-2 text-gray-600 dark:text-gray-300">
                                  <p>
                                    💡 <strong>Pro Tip:</strong> Book early for
                                    better rates!
                                  </p>
                                  <p>
                                    📅 Minimum 1 day advance booking required
                                  </p>
                                </div>
                              </div>
                            </div>
  );
};

export default PriceCalculate;

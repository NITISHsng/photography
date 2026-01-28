"use client";
import React, { useEffect, useState } from "react";
import { videoCategory } from "@/contexts/fromData";
import { calculateDuration } from "@/contexts/fromType";
import { BookingData, ExpandablePriceProps } from "@/contexts/fromType";
import { useAppContext } from "@/contexts/AppContext";

type Props = {
  localBooking: BookingData;
};

const PriceCalculate = ({ localBooking }: Props) => {
  const { teamMembers } = useAppContext();
  const [bookingData, setLocalBooking] = useState<BookingData>(localBooking);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<{
    id: string;
    name: string;
    price: number;
  } | null>(null);
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
    if (
      bookingData.requiredServices?.photography?.photoTypes &&
      bookingData.selectedService.some((s) => s.id === "photography")
    ) {
      additionalCosts +=
        bookingData.requiredServices.photography.photoTypes.reduce(
          (sum, v) => sum + v.price,
          0
        );
    }

    // album  price
    if (
      bookingData.requiredServices?.photography?.albumTypes &&
      bookingData.selectedService.some((s) => s.id === "photography")
    ) {
      additionalCosts +=
        bookingData.requiredServices.photography.albumTypes.reduce(
          (sum, v) => sum + v.price,
          0
        );
    }

    // Drone price
    if (
      bookingData.requiredServices.droneselected &&
      bookingData.selectedService.some((s) => s.id === "drone-coverage")
    ) {
      additionalCosts += bookingData.requiredServices.droneselected.reduce(
        (sum, v) => sum + v.price,
        0
      );
    }

    // Led Screen price
    if (
      bookingData.requiredServices.ledscreen &&
      bookingData.selectedService.some((s) => s.id === "led-screen")
    ) {
      additionalCosts += bookingData.requiredServices.ledscreen.reduce(
        (sum, v) => sum + v.price,
        0
      );
    }

    // lights  price

    if (
      bookingData.requiredServices.stageLights &&
      bookingData.selectedService.some((s) => s.id === "stage-lighting")
    ) {
      additionalCosts += bookingData.requiredServices.stageLights.reduce(
        (sum, v) => sum + v.price,
        0
      );
    }

    // video Category price
    if (
      bookingData.requiredServices.videography.videoCategory &&
      bookingData.selectedService.some((s) => s.id === "videography")
    ) {
      additionalCosts +=
        bookingData.requiredServices.videography.videoCategory.price;
    }

    if (
      bookingData.selectedService.some((a) => a.id === "videography") &&
      bookingData.requiredServices.videography.durationMinutes > 30
    ) {
      switch (bookingData.requiredServices.videography.videoCategory.id) {
        case "standard":
          videoDurationAmount =
            (bookingData.requiredServices.videography.durationMinutes - 30) *
            videoCategory[0].parMin;
          break;
        case "classic":
          videoDurationAmount =
            (bookingData.requiredServices.videography.durationMinutes - 30) *
            videoCategory[1].parMin;
          break;
        case "cinematic":
          videoDurationAmount =
            (bookingData.requiredServices.videography.durationMinutes - 30) *
            videoCategory[2].parMin;
          break;
      }
      additionalCosts += videoDurationAmount;
    }


    if (
      bookingData.selectedService.some((s) => s.id === "videography")
    ) {

      // video quality price
      if (bookingData.requiredServices.videography.videoQuality) {
        additionalCosts +=
          bookingData.requiredServices.videography.videoQuality.price;
      }
      
      // extra video price
      if (bookingData.requiredServices.videography.extraVideos) {
        additionalCosts +=
          bookingData.requiredServices.videography.extraVideos.reduce(
            (sum, v) => sum + v.price,
            0
          );
      }
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

    // if (totalDuration > 5) {
    //   const extraHours = (totalDuration - 5) * 200;
    //   const { finalPrice } = PriceHandeler(
    //     extraHours,
    //     0,
    //     bookingData.details.package,
    //     bookingData.details.areaType
    //   );
    //   daysAndEventDueration += finalPrice;
    //   baseServiceCost += finalPrice;
    // }

    // count unique event dates
    const slotCount = new Set(
      bookingData.details.eventTimes.map((slot) => slot.eventDate)
    ).size;


    if (slotCount > 1) {
      daysAndEventDueration = (slotCount - 1) * baseServiceCost * 0.7;
    }
    baseServiceCost = daysAndEventDueration + baseServiceCost;
    const totalAmount = baseServiceCost + additionalCosts;
    let discount = 0;

    
    // Apply discount if a team is selected (This logic seems arbitrary in the original code, maybe we remove it or adjust)
    // Original: discount = totalAmount * 0.1;
    // New Logic: If a team is selected, we might want to just show that team's price as the "Base" instead of the generic one.
    // However, the previous logic subtracted a discount.
    // The user requirement says "display total price based on each production team".
    // I will override the total Amount if a team is selected to match the team's calculated total
    
    // For now, let's keep the discount logic if it was intended, OR
    // actually, let's replace the baseServiceCost with the team's price if selected?
    // But selectedTeam is a string in the original, now it's an object.
    
    if (selectedTeam) {
       // If we want to strictly use the team's price as the "Base":
       // But wait, the main calculation function is generic. 
       // The best way is to calculate the specific team total separately or pass it in.
       // Let's leave the 'discount' logic as is for now if it preserves original behavior, 
       // BUT the user wants the price to be "based on each production team".
       
       // If I assume the user wants the Total to BE the one I calculated for the team:
       // I should probably calculate the total based on the team's productionPrice * days.
       
       // Let's refine this:
       // If selectedTeam is set, we use its price as the base.
       // We need to know the number of days.
       // const days = slotCount > 1 ? slotCount : 1; 
       // If slotCount is 0 (no dates), assume 1.
       
       // Re-claculate base for the selected team
       // The team's price is "per day" typically? fromType says productionPrice: number.
       // Let's assume it is per day.
       
       // We need to calculate the difference to show.
       // But the easiest way is to just let the "Team Total" be shown in the UI.
       
       // Let's use the 'discount' field to actually represent the "Adjustment" needed to reach the team's price?
       // No, simpler: Just Replace totalAmount with the selected team's total if strictly needed.
       
       // Current approach: Just calculate a discount for display like before, or remove it? 
       // The previous code had `discount = totalAmount * 0.1`.
       // I will update this to actually reflect the chosen team's price advantage or difference if I can.
       // But to keep it simple and fulfill the request "display total price best on each production team",
       // I will rely on the list showing the correct price, and when selected, maybe update the main price?
       
       // Let's NOT change the main calculation logic too drastically to avoid breaking hidden dependencies.
       // I will just keep the discount logic as 0 for now unless we want to apply a specific team discount.
       discount = 0; 
    }

    bookingData.details.totalAmount = totalAmount;

    return {
      baseServiceCost,
      additionalCosts,
      totalDuration,
      totalAmount,
      videoDurationAmount,
      daysAndEventDueration,
      discount,
    };
  };

// Define coupons
const COUPONS: Record<string, number> = {
  "ASAN-10": 10,
  "AB-50": 50,
  "ABA-50": 20,
};

// Calculate price for a specific team
const calculateTeamTotal = (
  teamPrice: number,
  couponCode?: string
) => {

  const { additionalCosts } = calculateServicePrice(bookingData);

  const slotCount = new Set(
    bookingData.details.eventTimes.map(slot => slot.eventDate)
  ).size;
  const days = slotCount > 0 ? slotCount : 1;

  const extraDurationCost =
    days > 1 ? (days - 1) * teamPrice * 0.7 : 0;

  const baseTotal = teamPrice + extraDurationCost;

  let total = baseTotal + additionalCosts;

  // Apply coupon discount safely
  let discountPercent = 0;

  if (couponCode && couponCode in COUPONS) {
    discountPercent = COUPONS[couponCode];
    total *= 1 - discountPercent / 100;
  }

  // Round to 2 decimal places
  total = Number(total.toFixed(2));
  return {
    total,
    discountPercent,
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

  const TeamSelectionModal = () => {
    // Filter production teams
    const productionTeams = teamMembers?.filter(
      (member) => member.role === "team"
    ) || [];

    const [tempSelectedTeam, setTempSelectedTeam] = useState<{
        id: string;
        name: string;
        price: number;
    } | null>(selectedTeam); // Initialize with currently selected team

    // Calculate price for a specific team logic removed from here as it is lifted up

    const handleConfirm = () => {
        if (tempSelectedTeam) {
            setSelectedTeam(tempSelectedTeam);
            // Find the team member to get the coupon code
            const selectedMember = teamMembers.find(t => t.memberId === tempSelectedTeam.id);
            if (selectedMember) {
                setLocalBooking(prev => ({
                    ...prev,
                    details: {
                        ...prev.details,
                        coupanCode: selectedMember.cuponCode || ""
                    }
                }));
            }

            setIsTeamModalOpen(false);
        }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Select Production Team
            </h3>
            <button
              onClick={() => setIsTeamModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="grid gap-4 flex-grow overflow-y-auto">
            {productionTeams.length === 0 && (
                <p className="text-center text-gray-500">No production teams available.</p>
            )}
            {productionTeams.map((team) => {
              const { total: estimatedTotal, discountPercent } = calculateTeamTotal( calculateServicePrice(bookingData).totalAmount, team?.cuponCode);             
              const isSelected = tempSelectedTeam?.id === team.memberId;

              return (
                <div
                  key={team.memberId}
                  onClick={() => {
                    setTempSelectedTeam({
                        id: team.memberId,
                        name: team.name,
                        price: estimatedTotal,
                    });
                  }}
                  className={`flex flex-col md:flex-row justify-between items-center p-4 rounded-xl cursor-pointer border-2 transition-all duration-200 group ${
                    isSelected 
                      ? "bg-blue-100 dark:bg-blue-900/40 border-blue-500" 
                      : "bg-gray-50 dark:bg-gray-700 border-transparent hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-2 md:mb-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={team.avatar || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                        alt={team.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm" 
                    />
                    <div>
                        <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                          {team.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                           <span>{team.productionCapability ? `Capability: ${team.productionCapability}` : 'Standard Team'}</span>
                           {team.rating && (
                               <>
                                <span>•</span>
                                <span className="flex items-center text-amber-500">
                                   ★ {team.rating}
                                </span>
                               </>
                           )}
                        </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Estimated Total</div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                    <span className="line-through text-gray-500 dark:text-gray-400 mr-2">
                    ₹{calculateServicePrice(bookingData).totalAmount}
                    </span>
                    <span>
                    ₹{estimatedTotal.toFixed(0)}
                    </span>
                    </div>
                    {discountPercent > 0 && (
                        <div className="text-xs text-red-500">
                            {discountPercent}% Coupon Applied
                        </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
             <button
              onClick={() => setIsTeamModalOpen(false)}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!tempSelectedTeam}
              className={`px-6 py-2 text-white font-bold rounded-lg transition-colors duration-300 shadow-md ${
                  tempSelectedTeam 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    );
  };

  const selectedTeamMember = selectedTeam
    ? teamMembers.find((t) => t.memberId === selectedTeam.id)
    : null;
    
  const { total: teamTotal, discountPercent: teamDiscountPercent } =
    selectedTeamMember
      ? calculateTeamTotal(
          selectedTeamMember.productionPrice || calculateServicePrice(bookingData).totalAmount,
          selectedTeamMember.cuponCode
        )
      : { total: 0, discountPercent: 0 };
  
  if (selectedTeamMember) {
    bookingData.details.totalAmount = teamTotal;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-700 ">
      <div className="text-center mb-4">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
         Price Calculator
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
            {bookingData.selectedService.map((serviceId) => (
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
            ))}
            {calculateServicePrice(bookingData).daysAndEventDueration > 0 && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  Day(s) & Duration
                </span>
                <span className="font-medium text-gray-800 dark:text-white">
                  ₹{calculateServicePrice(bookingData).daysAndEventDueration}
                </span>
              </div>
            )}
          </div>
          <hr className="mt-2" />
          <div className="text-right mt-1">
            Total Base Service Cost={" "}
            {calculateServicePrice(bookingData).baseServiceCost}
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
                items={bookingData.requiredServices.preWedding}
              />
            )}
            {bookingData.requiredServices.photography.photoTypes.length > 0 && (
              <ExpandablePrice
                title="Photo Types"
                items={bookingData.requiredServices.photography.photoTypes}
              />
            )}
            {bookingData.requiredServices.photography.albumTypes.length > 0 && (
              <ExpandablePrice
                title="Album"
                items={bookingData.requiredServices.photography.albumTypes}
              />
            )}
            {bookingData.selectedService.some(
              (s) => s.id === "videography"
            ) && (
              <ExpandablePrice
                title="Video Package"
                items={bookingData.requiredServices.videography.videoCategory}
              />
            )}
            {bookingData.selectedService.some(
              (s) => s.id === "videography"
            ) && (
              <ExpandablePrice
                title="Video Quality"
                items={bookingData.requiredServices.videography.videoQuality}
              />
            )}
            {bookingData.requiredServices.videography.extraVideos.length >
              0 && (
              <ExpandablePrice
                title="Extra Video"
                items={bookingData.requiredServices.videography.extraVideos}
              />
            )}
            {bookingData.requiredServices.droneselected.length >
              0 && (
              <ExpandablePrice
                title="Drone"
                items={bookingData.requiredServices.droneselected}
              />
            )}
            {bookingData.requiredServices.ledscreen.length >
              0 && (
              <ExpandablePrice
                title="Led Screen"
                items={bookingData.requiredServices.ledscreen}
              />
            )}
            {bookingData.requiredServices.stageLights.length > 0 && (
              <ExpandablePrice
                title="Lights"
                items={bookingData.requiredServices.stageLights}
              />
            )}

            {bookingData.requiredServices.videography.durationMinutes > 30 && (
              <div className="border border-black/20 rounded-lg px-2 py-1 cursor-pointer text-white/30 shadow-sm">
                <div className="flex justify-between font-medium text-gray-600 dark:text-gray-400">
                  <span>
                    Extra Video Duration{" "}
                    <span className="text-sm">
                      30+
                      {bookingData.requiredServices.videography
                        .durationMinutes - 30}{" "}
                    </span>
                  </span>
                  <span>
                    ₹{calculateServicePrice(bookingData).videoDurationAmount}
                  </span>
                </div>
              </div>
            )}

            <hr />
            <div className="text-right mt-3">
              Additional Costs={" "}
              {calculateServicePrice(bookingData).additionalCosts}
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
            {/* If a team is selected, show their calculated price, otherwise show standard */}

  {selectedTeam ? (
    <>
      <span className="line-through text-gray-500 dark:text-gray-400 mr-2">
        ₹{calculateServicePrice(bookingData).totalAmount}
      </span>
      <span>₹{teamTotal.toFixed(0)}</span>
    </>
  ) : (
    <span>₹{calculateServicePrice(bookingData).totalAmount}</span>
  )}


          </div>

          {selectedTeam && (
            <div className="mt-2 text-lg text-green-600 dark:text-green-400">
              <p>Team Selected: {selectedTeam.name}</p>
              {teamDiscountPercent > 0 && (
                <p className="text-sm text-red-500 font-semibold">
                  {teamDiscountPercent}% Coupon Applied ({selectedTeamMember?.cuponCode})
                </p>
              )}
            </div>
          )}

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            *Final price may vary based on specific requirements and location
          </p>
        </div>

        <div className="text-center text-sm mt-2 text-gray-600 dark:text-gray-300">
          <p>
            <strong>Pro Tip:</strong> Book early for better rates!
          </p>
          <p>Minimum 1 day advance booking required</p>
        </div>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsTeamModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
          >
            Select Production Team
          </button>
        </div>
      </div>

      {isTeamModalOpen && <TeamSelectionModal  />}
    </div>
  );
};

export default PriceCalculate;

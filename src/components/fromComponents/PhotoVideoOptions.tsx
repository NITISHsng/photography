import React from "react";
import { BookingData } from "@/contexts/fromType";
import { photoPackages } from "@/contexts/fromData";
import { albumOptions } from "@/contexts/fromData";
import { videoQualityOptions } from "@/contexts/fromData";
import { extraVideos } from "@/contexts/fromData";
import { videoCategory } from "@/contexts/fromData";
import { Clock} from "lucide-react";
import { PriceHandeler } from "@/contexts/fromData";
interface PhotosVideosProps {
  bookingData: BookingData;
  setBookingData: React.Dispatch<React.SetStateAction<BookingData>>;
}

const PhotoVideoOptions: React.FC<PhotosVideosProps> = ({
  bookingData,
  setBookingData,
}) => {
  return (
    <div>
      {/* photography */}
      {bookingData.selectedService.some((s) => s.id === "photography") && (
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Photography Options
          </h5>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {photoPackages.map((item) => {
              const isSelected =
                bookingData.requiredServices.photography.photoTypes.some(
                  (e) => e.id === item.id
                );

              const { mrp, discount, finalPrice } = PriceHandeler(
                item.price,
                item.discount,
                bookingData.details.package,
                bookingData.details.areaType
              );

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() =>
                    setBookingData((prev) => {
                      const alreadySelected =
                        prev.requiredServices.photography.photoTypes.some(
                          (e) => e.id === item.id
                        );

                      return {
                        ...prev,
                        requiredServices: {
                          ...prev.requiredServices,
                          photography: {
                            ...prev.requiredServices.photography,
                            photoTypes: alreadySelected
                              ? prev.requiredServices.photography.photoTypes.filter(
                                  (photo) => photo.id !== item.id
                                )
                              : [
                                  ...prev.requiredServices.photography
                                    .photoTypes,
                                  { id: item.id, price: finalPrice },
                                ],
                          },
                        },
                      };
                    })
                  }
                  className={`flex items-start gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-colors ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20"
                      : "border-gray-200 dark:border-gray-600 hover:border-cyan-200 dark:hover:border-cyan-400"
                  }`}
                >
                  <div className="shrink-0">{item.icon}</div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </span>

                    <div>
                      {/* MRP */}
                      <span className="text-xs text-gray-500 line-through">
                        ₹{mrp.toLocaleString()}
                      </span>

                      {/* Discount Badge */}
                      <span className="px-2 mx-2 py-0.5 text-[12px] font-semibold bg-cyan-100 text-cyan-400 rounded-full">
                        {discount}% OFF
                      </span>

                      {/* Final Price */}
                      <span className="text-sm font-bold text-cyan-300">
                        ₹{finalPrice}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Album Options */}
          <h6 className="font-medium mb-3">Album Options</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {albumOptions.map((album) => {
              const isSelected =
                bookingData.requiredServices.photography.albumTypes.some(
                  (e) => e.id === album.id
                );
              const { mrp, discount, finalPrice } = PriceHandeler(
                album.price,
                album.discount,
                bookingData.details.package,
                bookingData.details.areaType
              );
              return (
                <button
                  key={album.id}
                  type="button"
                  onClick={() =>
                    setBookingData((prev) => {
                      const alreadySelected =
                        prev.requiredServices.photography.albumTypes.some(
                          (e) => e.id == album.id
                        );

                      return {
                        ...prev,
                        requiredServices: {
                          ...prev.requiredServices,
                          photography: {
                            ...prev.requiredServices.photography,
                            albumTypes: alreadySelected
                              ? prev.requiredServices.photography.albumTypes.filter(
                                  (v) => v.id !== album.id
                                ) // remove
                              : [
                                  ...prev.requiredServices.photography
                                    .albumTypes,
                                  { id: album.id, price: finalPrice },
                                ], // add
                          },
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
                    {album.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {album.desc}
                  </div>
                  <div>
                    {/* MRP */}
                    <span className="text-xs text-gray-500 line-through">
                      ₹{mrp}
                    </span>

                    {/* Discount Badge */}
                    <span className="px-2 mx-2 py-0.5 text-[12px] font-semibold bg-green-100 text-green-800 rounded-full">
                      {discount}% OFF
                    </span>

                    {/* Final Price */}
                    <span className="text-sm font-bold text-green-500">
                      {finalPrice === 0 ? "Free" : `₹${finalPrice}`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* video graphy options */}
      {bookingData.selectedService.some((s) => s.id === "videography") && (
        <div className="mb-6">
          <h5 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Videography Options
          </h5>

          {/* Type of Videography */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {videoCategory.map((opt) => {

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
          setBookingData((prev) => ({
            ...prev,
            requiredServices: {
              ...prev.requiredServices,
              videography: {
                ...prev.requiredServices.videography,
                videoCategory: {
                  id: opt.id as "classic" | "cinematic" | "standard",
                  price: finalPrice, // ✅ store calculated price
                },
              },
            },
          }))
        }
        className={`flex-1 justify-center px-4 py-3 rounded-xl border-2 flex flex-col-2 items-center gap-3 ${
          bookingData.requiredServices.videography.videoCategory.id === opt.id
            ? "border-orange-400 bg-orange-50 dark:bg-orange-900/10"
            : "border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600"
        }`}
      >
        <span>{opt.icon}</span>
        <div>
          <span className="font-medium">{opt.name}</span>
          <div>
            {/* ✅ use calculated MRP */}
            <span className="text-xs text-gray-500 line-through">
              ₹{mrp.toLocaleString()}
            </span>

            {/* ✅ use calculated discount */}
            <span className="px-2 mx-2 py-0.5 text-[12px] font-semibold bg-red-100 text-red-600 rounded-full">
              {discount}% OFF
            </span>

            {/* ✅ use calculated final price */}
            <span className="text-sm font-bold text-orange-500">
              {finalPrice === 0 ? "Free" : `₹${finalPrice.toLocaleString()}`}
            </span>
          </div>
        </div>
      </button>
    );
  })}
</div>


          {/* Duration */}
          <div className="flex items-center gap-6 mt-3 mb-4">
            <div className="flex-1">
              <label className="block font-medium mb-1 ">
                Duration (minutes) * — min 10, max 180
              </label>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 border-orange-400" />
                <input
                  type="range"
                  min={10}
                  max={180}
                  step={1}
                  value={
                    bookingData.requiredServices.videography.durationMinutes
                  }
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      requiredServices: {
                        ...prev.requiredServices,
                        videography: {
                          ...prev.requiredServices.videography,
                          durationMinutes: parseInt(e.target.value, 10),
                        },
                      },
                    }))
                  }
                  className="flex-1 border-orange-400 cursor-pointer"
                />
                <span className="text-sm font-medium">
                  {bookingData.requiredServices.videography.durationMinutes} min
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 dark:text-white">
                Cost: <span className="line-through px-2 text-[16px]">₹80</span>
                ₹50 per minute ={" "}
                <span className="font-semibold border-orange-400">
                  ₹
                  {bookingData.requiredServices.videography.durationMinutes *
                    50}
                </span>
              </p>
            </div>
          </div>

          {/* Video Quality */}
          <h6 className="font-medium mb-2">Video Quality</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoQualityOptions.map((quality) => {
        const { mrp, discount, finalPrice } = PriceHandeler(
      quality.price,
      quality.discount,
      bookingData.details.package,
      bookingData.details.areaType
    );
              
              return (

              
              <button
                key={quality.id}
                type="button"
                onClick={() =>
                  setBookingData((prev) => ({
                    ...prev,
                    requiredServices: {
                      ...prev.requiredServices,
                      videography: {
                        ...prev.requiredServices.videography,
                        videoQuality: {
                          id: quality.id as "1080p" | "4k" | "8k",
                          price: finalPrice,
                        },
                      },
                    },
                  }))
                }
                className={`flex-1 justify-center px-4 py-3 rounded-xl border-2 flex flex-col-2 items-center gap-3 ${
                  bookingData.requiredServices.videography.videoQuality.id ===
                  quality.id
                    ? "border-orange-400 bg-orange-50 dark:bg-orange-900/10"
                    : "border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600"
                }`}
              >
                <div>{quality.icon}</div>
                <div>
                  <div className="font-medium">{quality.label}</div>

                  <div>
                    {/* MRP */}
                    <span className="text-xs text-gray-500 line-through">
                      ₹{mrp.toLocaleString()}
                    </span>

                    {/* Discount Badge */}
                    <span className="px-2 mx-2 py-0.5 text-[12px] font-semibold bg-red-100 text-red-600 rounded-full">
                      {discount}% OFF
                    </span>

                    {/* Final Price */}
                    <span className="text-sm font-bold text-orange-500">
                      {finalPrice === 0 ? "Free" : `₹${finalPrice}`}
                    </span>
                  </div>
                </div>
              </button>
)})}
          </div>

          <h6 className="font-medium mb-2">Extra Videos</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            {extraVideos.map((opt) => {
              const isSelected =
                bookingData.requiredServices.videography.extraVideos?.some(
                  (a) => a.id === opt.id
                );
            const { discount, finalPrice } = PriceHandeler(
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
                      const alreadySelected =
                        prev.requiredServices.videography.extraVideos.some(
                          (e) => e.id === opt.id
                        );

                      return {
                        ...prev,
                        requiredServices: {
                          ...prev.requiredServices,
                          videography: {
                            ...prev.requiredServices.videography,
                            extraVideos: alreadySelected
                              ? prev.requiredServices.videography.extraVideos.filter(
                                  (v) => v.id !== opt.id
                                ) // remove
                              : [
                                  ...prev.requiredServices.videography
                                    .extraVideos,
                                  { id: opt.id, price: finalPrice },
                                ],
                          },
                        },
                      };
                    })
                  }
                  className={`flex-1 px-4 py-5 rounded-xl border-2 flex flex-col-2 items-center justify-center text-center gap-3 transition-all ${
                    isSelected
                      ? "border-orange-400 bg-orange-50 dark:bg-orange-900/10"
                      : "border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-600"
                  }`}
                >
                  <div>{opt.icon}</div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {opt.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {opt.desc}
                    </div>
                    <div className="mt-1 flex items-center space-x-2">
                      {/* MRP */}
                      <span className="text-xs text-gray-500 line-through">
                        ₹{opt.mrp.toLocaleString()}
                      </span>

                      {/* Discount Badge */}
                      <span className="px-2 mx-2 py-0.5 text-[12px] font-semibold bg-red-100 text-red-600 rounded-full">
                        {discount}% OFF
                      </span>

                      {/* Final Price */}
                      <span className="text-sm font-bold text-orange-500">
                        ₹{finalPrice}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoVideoOptions;

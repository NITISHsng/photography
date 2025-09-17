"use client";

import React from "react";
import Image from "next/image";

import {
  imageUrlsRow1,
  imageUrlsRow2,
  imageUrlsRow3,
  imageUrlsRow4,
} from "@/contexts/homepageData";

import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
const Hero: React.FC = () => {

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderRow = (
    images: string[],
    direction: "left" | "right",
    rowKey: string
  ) => (
    <div className={`flex scroll-${direction} h-1/4 mt-[-1px]`}>
      {images.concat(images).map((url, index) => (
        <Image
          key={`${rowKey}-${index}`}
          src={url}
          alt={`Photography ${index + 1}`}
          width={300}
          height={200}
          className="h-full w-auto object-cover"
        />
      ))}
    </div>
  );

  return (
    <section
      id="home"
      className="pt-20 flex items-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden"
    >
      {/* Scrolling Image Background */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden md:mt-[55px] mt-[50px]">
        {/* Row 1 */}
        {renderRow(imageUrlsRow1, "left", "row1")}
        {/* Row 2 */}
        {renderRow(imageUrlsRow2, "right", "row2")}
        {/* Row 3 */}
        {renderRow(imageUrlsRow3, "left", "row3")}
        {/* Row 4 */}
        {renderRow(imageUrlsRow4, "right", "row4")}

        {/* Overlay for readability */}
        <div className="h-full w-full absolute inset-0 dark:bg-black/30 bg-black/10 rounded-xl"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 lg:px-8 md:py-36 md:pt-32 pb-20 relative z-10 items-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:gap-16 gap-5">
            <div className="text-center lg:text-left items-center">
              {/* Headline */}
              <h1 className="hidden md:block text-white md:text-6xl lg:text-7xl font-bold tracking-tight dark:text-white/80 mb-4 leading-tight">
                <div className="text-4xl justify-center md:justify-start flex">
                  Capture
                  <span className="block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    .
                  </span>
                </div>
                <div className="flex text-5xl justify-center md:justify-start items-center">
                  Create
                  <span className="block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    .
                  </span>
                </div>
                <span className="text-6xl justify-center md:justify-start flex">
                  Deliver
                  <span className="block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    .
                  </span>
                </span>
              </h1>

              {/* Subtitle */}
              <div className="mb-0 md:mb-2 mt-6">
                <p className="text-2xl text-white dark:text-gray-300 mb-4 font-semibold">
                  Welcome to AsanCapture
                </p>
                <p className="text-lg text-white font-normal font-mono leading-relaxed">
                  From weddings to commercials, we bring your story to life with
                  cinematic excellence.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex justify-center ">
                <div className="flex flex-col sm:flex-row gap-6 lg:justify-center md:mb-12 mt-2 lg:mt-4">
                  <button
                    onClick={scrollToContact}
                    className="group max-w-[200px] hidden mb-4 md:inline-flex items-center justify-center px-8 md:py-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 md:rounded-tl-[0px] md:rounded-br-[0px] rounded-tr-[40px] rounded-bl-[40px] font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    className="group max-w-[200px] mb-4 inline-flex items-center justify-center px-8 py-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 md:rounded-tl-[0px] md:rounded-br-[0px] rounded-tr-[40px] rounded-bl-[40px] font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Play className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                   <Link href={"/hiring"}>
                    <span>Book Us</span>
                   </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="mt-2 w-screen flex md:mt-20 text-center absolute bottom-28 md:bottom-5 justify-center">
        <div className="inline-flex items-center space-x-8 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Available 24/7
            </span>
          </div>
          <div className="hidden items-center space-x-2 md:flex">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Same Day Response
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Free Consultation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {imageUrlsRow1 } from "@/contexts/homepageData"
import {imageUrlsRow2 } from "@/contexts/homepageData"
import {imageUrlsRow3 } from "@/contexts/homepageData"
import {imageUrlsRow4 } from "@/contexts/homepageData"

import {
  ArrowRight,
  Play,
} from "lucide-react";

const Hero: React.FC = () => {
const router = useRouter();


  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <section id='home' className="pt-20  min-h-screen  bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 h-[100%] w-full overflow-hidden md:mt-[65px] mt-[68px]">
        {/* Row 1 */}
        <div className="flex scroll-left h-1/4">
          {imageUrlsRow1.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Photography ${index + 1}`}
              className="h-full w-auto object-cover"
            />
          ))}
          {imageUrlsRow1.map((url, index) => (
            <img
              key={`dup1-${index}`}
              src={url}
              alt={`Photography ${index + 1}`}
              className="h-full w-auto object-cover"
            />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex scroll-right h-1/4 mt-[-1px]">
          {imageUrlsRow2.map((url, index) => (
            <img
              key={`r2-${index}`}
              src={url}
              alt={`Photography ${index + 1}`}
              className="h-full w-auto object-cover"
            />
          ))}
          {imageUrlsRow2.map((url, index) => (
            <img
              key={`dup2-${index}`}
              src={url}
              alt={`Photography ${index + 1}`}
              className="h-full w-auto object-cover"
            />
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex scroll-left h-1/4 mt-[-1px]">
          {imageUrlsRow3.map((url, index) => (
            <img
              key={`r3-${index}`}
              src={url}
              alt={`Photography ${index + 1}`}
              className="h-full w-auto object-cover"
            />
          ))}
          {imageUrlsRow3.map((url, index) => (
            <img
              key={`dup3-${index}`}
              src={url}
              alt={`Photography ${index + 1}`}
              className="h-full w-auto object-cover"
            />
          ))}
        </div>

        {/* Row 4 */}
        <div className="flex scroll-right h-1/4 mt-[-1px]">
          {imageUrlsRow4.map((url, index) => (
            <img
              key={`r2-${index}`}
              src={url}
              alt={`Photography ${index + 1}`}
              className="h-full w-auto object-cover"
            />
          ))}
          {imageUrlsRow4.map((url, index) => (
            <img
              key={`dup2-${index}`}
              src={url}
              alt={`Photography ${index + 1}`}
              className="h-full w-auto object-cover"
            />
          ))}
        </div>
        {/* overlay for readability */}
       
       <div className="h-full w-full absolute inset-0 dark:bg-black/30  bg-black/10 rounded-xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 MD:py-36 pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid md:gap-16 gap-5 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Main Headline */}
              <h1 className="text-5xl text-white md:text-6xl lg:text-7xl font-bold tracking-tight dark:text-white/80 mb-4 leading-tight">
                <div className=" text-4xl">Capture.</div>
                <div className="flex text-5xl justify-center md:justify-start  items-center from-blue-500 via-purple-600 to-pink-500 bg-clip-text ">
                  Create
                  <span className="block bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    .
                  </span>
                </div>
                <span className="block">Deliver.</span>
              </h1>

              {/* Subtitle */}
              <div className="mb-0  md:mb-2 ">
                <p className="text-2xl md:text-2xl text-white dark:text-gray-300 mb-2 font-semibold">
                  Welcome to{" "}
                  {/* <span className="font-bold text-blue-600 dark:text-blue-400"> */}
                  AsanCapture
                  {/* </span> */}
                </p>
                <p className="text-lg text-white font-normal font-mono leading-relaxed">
                  From weddings to commercials, we bring your story to life with
                  cinematic excellence.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-center md:mb-12 mt-20 lg:mt-4 ">
                <button
                  onClick={scrollToContact}
                  className="group rounded-2xl inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white md:rounded-tl-[0px] md:rounded-br-[0px] md:rounded-tr-[40px] md:rounded-bl-[40px] font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl  transform hover:scale-105 hover:-translate-y-1"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => router.push("/hiring")}
                  className="group rounded-2xl inline-flex items-center justify-center px-8 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 md:rounded-tl-[0px] md:rounded-br-[0px] md:rounded-tr-[40px] md:rounded-bl-[40px] font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Book Us</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
          {/* Bottom Section - Additional Info */}
          <div className="mt-2 w-screen flex md:mt-20 text-center absolute bottom-5 justify-center">
            <div className="inline-flex items-center space-x-8 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Available 24/7
                </span>
              </div>
              <div className=" hidden items-center space-x-2 md:flex">
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

"use client";

import React from "react";
import Image from "next/image";
import { ourServices } from "@/contexts/fromData";
import { useInView } from "react-intersection-observer";

const Services = () => {
  return (
    <section
      id="services"
      className="md:py-12 py-8 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive video production services to bring your vision to
            life, from concept to delivery.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {ourServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface Service {
  imageUrl: string;
  label: string;
}

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`bg-white relative rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden dark:bg-gray-600 dark:border-gray-600 flex flex-col ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transitionProperty: "opacity, transform",
      }}
    >
      {/* Image Section */}
      <div className="relative w-full h-60 sm:h-64 md:h-56 lg:h-48">
        <Image
          src={service.imageUrl}
          alt={service.label}
          fill
          className="object-cover rounded-t-2xl"
        />
      </div>

      {/* Text Section */}
      <div className="p-4 flex items-center justify-center">
        <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-white break-words">
          {service.label}
        </h3>
      </div>
    </div>
  );
};



export default Services;

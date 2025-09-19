"use client"

import React from "react";
import { Users, Zap, Award, Clock, Shield, Video } from "lucide-react";
const WhyChooseUs = () => {
  const whyChooseUs = [
    {
      icon: Users,
      title: "Professional, Creative Team",
      description: "Expert videographers and editors with years of experience",
      stat: "80+ Professionals",
      bgImage:
        "https://images.stockcake.com/public/b/d/5/bd5da004-0c7a-4dec-8784-00a44a01f9fb_large/studio-in-action-stockcake.jpg",
    },
    {
      icon: Shield,
      title: "Full Service Production",
      description: "From concept to delivery, we handle everything",
      stat: "100% Complete",
      bgImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv1akfDf1VErt3dBRghCPskQAYdfi8YBQ6Vxfyv7htsI0mGPc-AWTbHcGe&s=10",
    },
    {
      icon: Zap,
      title: "Fast Turnaround & Revisions",
      description:
        "Quick delivery with unlimited revisions until you're satisfied",
      stat: "< Week",
      bgImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDqbdxbN-zkzbzr0rGmRohR5EG9O3PBJqGqCgvHmsp1X79AUtBbiEOvf4&s=10",
    },
    {
      icon: Video,
      title: "HD/4K/8k Output Quality",
      description: "Crystal clear, professional-grade video output",
      stat: "4K Quality",
      bgImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuryWL5uu-nFAFgXHgDCNhPqtr_1V_ZEPK_Q&s",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Available 24/7 to accommodate your timeline and needs",
      stat: "24/7 Available",
      bgImage:
        "https://www.iotics.io/cdn/shop/articles/businessman-marking-dates-virtual-calendar-managing-his-business-schedule-setting_62ddf844-9f62-408a-b061-1f61359ae0e9.jpg?v=1745586700&width=1100",
    },
    {
      icon: Award,
      title: "Affordable Packages",
      description: "Competitive pricing without compromising on quality",
      stat: "Best Value",
      bgImage:
        "https://knowyournumbers.biz/wp-content/uploads/2024/11/Pricing-1.jpg",
    },
  ];

  return (
    <div>
      {/* Why Choose Us Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 md:p-12 relative overflow-hidden mb-12 md:mb-20">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-purple-500 rounded-full blur-2xl"></div>
        </div>

        <div className="relative">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose Us?
              </span>
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We deliver exceptional results that exceed expectations, every
              time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${item.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="relative p-3 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
                >
                  {/* overlay for readability */}
                  <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

                  {/* content above overlay */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-200">
                          {item.stat}
                        </div>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 text-white">
                      {item.title}
                    </h4>
                    <p className="text-gray-200 text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

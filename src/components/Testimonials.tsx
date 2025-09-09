import React, { useState, useEffect, useRef } from "react";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Award,
} from "lucide-react";

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

const testimonials = [
  {
    name: "Vikram Paul",
    role: "Wedding Couple",
    content:
      "আসানক্যাপচার আমাদের বিয়ের দিনটিকে স্বপ্নময় করে তুলেছিল! তারা প্রতিটি মুহূর্ত অসাধারণভাবে ধারণ করেছে। ভিডিওটি দেখে চোখে জল এসে যায়।",
    rating: 5,
    image:
      "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    project: "Wedding Videography",
  },
  {
    name: "Rohan Singha",
    role: "Marketing Director",
    content:
      "আমাদের প্রোডাক্ট লঞ্চ ভিডিওটি অসাধারণ হয়েছে! তাদের কাজের মান ছিল দারুণ এবং তারা পুরোপুরি আমাদের ধারণা বাস্তবায়ন করেছে। বিক্রি 4০% বেড়েছে।",
    rating: 5,
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    project: "Commercial Production",
  },
  {
    name: "Ananya Paul",
    role: "Event Coordinator",
    content:
      "আমরা একাধিক কর্পোরেট ইভেন্টে তাদের সাথে কাজ করেছি। প্রতিবারই তারা আমাদের প্রত্যাশা ছাড়িয়ে গেছে। তাদের পেশাদারিত্ব প্রশংসনীয়।",
    rating: 5,
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    project: "Corporate Events",
  },
  {
    name: "Aarav Roy",
    role: "Music Producer",
    content:
      "তাদের তৈরি করা মিউজিক ভিডিওটি চমৎকার হয়েছে! সৃজনশীলতা ও দক্ষতায় ভরা কাজটি খুব দ্রুত ভাইরাল হয়ে যায়।",
    rating: 5,
    image:
      "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    project: "Music Video",
  },
  {
    name: "Sneha Singha",
    role: "Restaurant Owner",
    content:
      "আমাদের রেস্টুরেন্টের প্রোমো ভিডিওটি দারুণভাবে পরিবেশ ও খাবারের সৌন্দর্য তুলে ধরেছে। বুকিং 36% বৃদ্ধি পেয়েছে।",
    rating: 5,
    image:
      "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    project: "Promotional Video",
  },
  {
    name: "Priya Roy",
    role: "Documentary Filmmaker",
    content:
      "আসানক্যাপচারের সঙ্গে ডকুমেন্টারি বানাতে দারুণ অভিজ্ঞতা হয়েছে। তাদের প্রযুক্তিগত দক্ষতা আমাদের কাজকে উৎসবে পুরস্কৃত করেছে।",
    rating: 5,
    image:
      "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    project: "Documentary",
  },
];



  const stats = [
    {
      value: "98%",
      title: "Client Satisfaction",
      subtitle: "Based on 800+ projects",
      color:
        "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      value: "800+",
      title: "Happy Clients",
      subtitle: "Across all industries",
      color:
        "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      value: "4.9",
      title: "Average Rating",
      subtitle: "Out of 5 stars",
      color:
        "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      value: "24h",
      title: "Response Time",
      subtitle: "Average response",
      color:
        "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
      textColor: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 322;
      const gap = 24;
      const scrollPosition = index * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const nextTestimonial = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    scrollToIndex(nextIndex);
  };

  const prevTestimonial = () => {
    const prevIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  return (
    <section className="py-10 md:py-12 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      {/* <div className="absolute inset-0 opacity-5 dark:opacity-3">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about their experience with AsanCapture.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Testimonials */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide py-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 md:w-90 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
              >
                {/* Project Type Badge */}
                <div className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <Play className="h-3 w-3 text-blue-600" />
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {testimonial.project}
                  </span>
                </div>

                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                  <Quote className="h-6 w-6 text-white" />
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Content */}
                <blockquote className="text-lg font-medium text-gray-800 dark:text-white mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-white dark:border-gray-600"
                  />
                  <div>
                    <div className="font-bold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">
                      {testimonial.role}
                    </div>
                    
                    {/* <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {testimonial.company}
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Enhanced Stats Row */}
        <div className="grid md:grid-cols-4 gap-4 md:gap-8 mt-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-4 bg-gradient-to-br ${stat.color} rounded-xl`}
            >
              <div className={`text-4xl font-bold ${stat.textColor} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                {stat.title}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {stat.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;

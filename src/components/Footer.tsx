"use client";

import React from "react";
import {
  Video,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Camera,
  Edit,
  Users,
  Award,
  Clock,
  Shield,
} from "lucide-react";
import CountUp from "./sub_Components/numberAnimation";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Cameraman Hire (comming soon)", href: "#services" },
      { name: "Equipment Rental (comming soon)", href: "#services" },
      { name: "Video Editing (comming soon)", href: "#services" },
      { name: "Production Contracts", href: "#services" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#about" },
      { name: "Careers", href: "/join-us" },
      { name: "Blog", href: "#" },
    ],
    support: [
      { name: "Contact Us", href: "#contact" },
      { name: "Book Event", href: "/hiring" },
      { name: "Join Our Team", href: "/join-us" },
      { name: "FAQ", href: "#" },
      { name: "Support Center", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
    quickStats: [
      { icon: Users, label: "40+ Team Members", value: 40 },
      { icon: Award, label: "Projects Completed", value: 800 },
      { icon: Clock, label: "Years Experience", value: 5 },
      { icon: Shield, label: "Client Satisfaction", value: 98 },
    ],
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-blue-400" },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
  ];

  const specialties = [
    {
      icon: Camera,
      name: "Wedding Photography",
      description: "Capturing your special moments",
    },
    {
      icon: Video,
      name: "Event Videography",
      description: "Professional event coverage",
    },
    {
      icon: Edit,
      name: "Post Production",
      description: "Expert editing and effects",
    },
    {
      icon: Users,
      name: "Team Collaboration",
      description: "Coordinated professional crews",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith("/")) {
      // Handle page navigation
      if (href === "/hiring") {
        window.location.href = "/hiring";
      } else if (href === "/join-us") {
        window.location.href = "/join-us";
      }
    } else if (href.startsWith("#")) {
      // Handle section scrolling
      scrollToSection(href);
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <Video className="h-10 w-10 text-blue-400" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80"></div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AsanCapture
                </span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your trusted partner in high-quality video production. We
                capture memories and create stories that last a lifetime. From
                weddings to corporate events, we bring your vision to life with
                professional excellence.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {footerLinks.quickStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="bg-gray-800 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <IconComponent className="h-4 w-4 text-blue-400" />
                        <span className="text-lg font-bold text-white">
                          <div className="flex font-bold  dark:text-white mb-2">
                            <CountUp
                              target={stat.value}
                              duration={1500}
                              delay={400}
                              step={10}
                            />
                            {stat.label == "Client Satisfaction" ? "%" : "+"}
                          </div>
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-10 h-10 bg-gray-800 ${social.color} rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-blue-400">
                Our Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Specialties */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-4 text-purple-400">
                  Specialties
                </h4>
                <div className="space-y-3">
                  {specialties.slice(0, 2).map((specialty, index) => {
                    const IconComponent = specialty.icon;
                    return (
                      <div key={index} className="flex items-start space-x-2">
                        <IconComponent className="h-4 w-4 text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            {specialty.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {specialty.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-purple-400">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200 hover:translate-x-1 transform text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>

              {/* More Specialties */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-4 text-green-400">
                  More Services
                </h4>
                <div className="space-y-3">
                  {specialties.slice(2).map((specialty, index) => {
                    const IconComponent = specialty.icon;
                    return (
                      <div key={index} className="flex items-start space-x-2">
                        <IconComponent className="h-4 w-4 text-purple-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            {specialty.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {specialty.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Support & Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-green-400">
                Support & Contact
              </h3>
              <ul className="space-y-3 mb-8">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 hover:translate-x-1 transform text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <a
                    href="mailto:hello@AsanCapture.com?subject=Hello%20from%20your%20website&body=Hi%20Team%2C%0A%0AI%20am%20interested%20in%20your%20services.%20Please%20get%20back%20to%20me.%0A%0AThanks!"
                    className="text-gray-300 text-sm hover:underline"
                  >
                    hello@AsanCapture.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <a
                    href="tel:+918001338614"
                    className="text-gray-300 text-sm hover:underline"
                  >
                    +91-8001338614
                  </a>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-purple-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    virtual office - vision care , kachakali City & Kolkata
                    secter iii
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        {/* <div className="border-t border-gray-800 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Stay Updated</h3>
              <p className="text-gray-300">
                Get the latest updates on our services, exclusive offers, and industry insights.
              </p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-r-lg font-medium transition-all duration-200 hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Awards & Recognition */}
        {/* <div className="border-t border-gray-800 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Awards & Recognition</h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span>Best Wedding Videography 2023</span>
              </span>
              <span className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span>Excellence in Commercial Production</span>
              </span>
              <span className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-yellow-400" />
                <span>Top Rated Video Production Company</span>
              </span>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} AsanCapture. All rights reserved. | Professional
              Video Production Services
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Developed by</span>
              {/* <Heart className="h-4 w-4 text-red-500 fill-current" /> */}
              <a
                href="https://devnitishx.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Nitish Chandra Singha
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

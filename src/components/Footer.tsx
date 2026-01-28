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
import { motion } from "framer-motion";

// Fade Up Animation
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const, // FIX
    },
  },
};

// Stagger Children
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Floating blobs animation
const floating = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const,  // ✔ now TypeScript accepts it
    },
  },
};


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Cameraman Hire (coming soon)", href: "#services" },
      { name: "Equipment Rental (coming soon)", href: "#services" },
      { name: "Video Editing (coming soon)", href: "#services" },
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
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
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
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith("/")) {
      window.location.href = href;
    } else if (href.startsWith("#")) {
      scrollToSection(href);
    }
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Floating Background Blobs */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-10"
        variants={floating}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-10"
        variants={floating}
        animate="animate"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Content with stagger animation */}
        <motion.div
          className="py-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">

            {/* Brand Section */}
            <motion.div variants={fadeUp} className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Video className="h-10 w-10 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  AsanCapture
                </span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Your trusted partner in high-quality video production. We capture stories that last forever.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {footerLinks.quickStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={fadeUp}
                      className="bg-gray-800 p-3 rounded-lg"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon className="h-4 w-4 text-blue-400" />
                        <div className="flex font-bold mt-2 items-center dark:text-white">
                          <CountUp target={stat.value} duration={1500} delay={400} step={10} />
                          {stat.label === "Client Satisfaction" ? "%" : "+"}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Icons */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      whileHover={{ scale: 1.15 }}
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Services Links */}
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold mb-6 text-blue-400">Our Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="text-gray-300 hover:text-blue-400 transition"
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
                    const Icon = specialty.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={fadeUp}
                        whileHover={{ x: 5 }}
                        className="flex items-start space-x-2"
                      >
                        <Icon className="h-4 w-4 text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            {specialty.name}
                          </p>
                          <p className="text-xs text-gray-500">{specialty.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Company */}
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold mb-6 text-purple-400">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="text-gray-300 hover:text-purple-400 transition"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>

              {/* More specialties */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-4 text-green-400">More Services</h4>
                <div className="space-y-3">
                  {specialties.slice(2).map((specialty, index) => {
                    const Icon = specialty.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={fadeUp}
                        whileHover={{ x: 5 }}
                        className="flex items-start space-x-2"
                      >
                        <Icon className="h-4 w-4 text-purple-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-300">
                            {specialty.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {specialty.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div variants={fadeUp}>
              <h3 className="text-lg font-semibold mb-6 text-green-400">
                Support & Contact
              </h3>
              <ul className="space-y-3 mb-8">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="text-gray-300 hover:text-green-400 transition"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <a
                    href="mailto:hello@AsanCapture.com"
                    className="text-gray-300 text-sm hover:underline"
                  >
                    hello@AsanCapture.com
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-400" />
                  <a href="tel:+918001338614" className="text-gray-300 text-sm hover:underline">
                    +91-8001338614
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-purple-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    virtual office - vision care , kachakali City & Kolkata sector iii
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 py-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-sm">
            <div>
              © {currentYear} AsanCapture. All rights reserved. | Professional Video Services
            </div>
            <div className="flex items-center space-x-1">
              <span>Developed by</span>
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
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

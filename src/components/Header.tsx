"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Menu, X, Video } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { headerType } from "@/contexts/fromType";

const navLinks = [
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const actionButtons = [
  {
    label: "Home",
    href: "/",
    gradient: "from-blue-400 via-blue-500 to-blue-600",
    darkGradient: "dark:from-blue-700 dark:via-blue-800 dark:to-blue-900",
    showWhenHome: false,
  },
  {
    label: "Gallery",
    href: "/gallery",
    gradient: "from-purple-400 via-purple-500 to-purple-600",
    darkGradient: "dark:from-purple-700 dark:via-purple-800 dark:to-purple-900",
  },
  {
    label: "Explore Teams",
    href: "/productionteams",
    gradient: "from-green-400 via-teal-500 to-teal-600",
    darkGradient: "dark:from-green-700 dark:via-teal-700 dark:to-teal-900",
  },
  {
    label: "Book Event",
    href: "/book-event",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    darkGradient: "hover:from-blue-600 hover:via-blue-700 hover:to-blue-800",
  },
  {
    label: "Join Us",
    href: "/join-us",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    darkGradient: "hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
  },
  {
    label: "Member",
    href: "/member",
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    darkGradient: "hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700",
  },
];
const Header: React.FC<headerType> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  currentPage,
}) => {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(pathname === "/");
  }, [pathname]);

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== "home") {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* Logo */}
          <Link href={"/"}>
          
          <div
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <Video className="h-10 w-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80 group-hover:scale-125 transition-transform duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              AsanCapture
            </span>
          </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {isHomePage &&
              navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative px-6 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-lg"
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              ))}
          </nav>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <span className="hidden md:inline-flex items-center gap-4">
              {/* Conditional Home Button */}

              {actionButtons.map((btn) => (
                <Link key={btn.label} href={btn.href}>
                  <button
                    className={`hidden md:inline-flex items-center relative px-4 py-2.5 font-bold text-white bg-gradient-to-r ${btn.gradient} ${btn.darkGradient} shadow-md hover:shadow-xl rounded-lg overflow-hidden group transition-all duration-300 transform hover:-translate-y-1 hover:scale-105`}
                  >
                    <span className="relative z-10">{btn.label}</span>
                    <div className="absolute inset-0 bg-white/20 dark:bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                  </button>
                </Link>
              ))}
            </span>

            {/* Mobile Menu Button */}

            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group shadow-md hover:shadow-lg"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
              {mobileMenuOpen ? (
                <X className="h-6 w-6 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-12 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-2">
              {isHomePage &&
                navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="w-full relative px-6 py-4 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-lg"
                  >
                    <span className="relative z-10">{link.label}</span>
                  </button>
                ))}


              {actionButtons.slice(1).map((btn) => (
                <Link key={btn.label} href={btn.href}>
                  <button
                    className={`w-full relative px-6 py-4 mb-4 font-bold text-white bg-gradient-to-r ${btn.gradient} ${btn.darkGradient} shadow-md hover:shadow-xl rounded-lg overflow-hidden group transition-all duration-300 transform hover:-translate-y-1 hover:scale-105`}
                  >
                    <span className="relative z-10">{btn.label}</span>
                    <div className="absolute inset-0 bg-white/20 dark:bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                  </button>
                </Link>
              ))}

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

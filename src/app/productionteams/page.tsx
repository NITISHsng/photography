"use client";

import React from "react";
import NearTeams from "@/components/NearTeams";
import Header from "@/components/Header";
import { useAppContext } from "@/contexts/AppContext";

const ProductionTeamPage = () => {
  const { mobileMenuOpen, setMobileMenuOpen, currentPage } =
    useAppContext();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        currentPage={currentPage}
      />

      <section className="pt-16 pb-2 px-6 md:px-12 text-center ">
        <h1 className="text-xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Find Video Production Team Near You 
        </h1>
        <p className="text-lg md:text-xl pb-5 hidden md:flex text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Search by name, city, or pincode and connect with top videographers,
          editors, and production teams across India.
        </p>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 ">
        <NearTeams />
      </main>
    </div>
  );
};

export default ProductionTeamPage;

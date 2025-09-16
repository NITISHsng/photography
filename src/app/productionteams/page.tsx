"use client";

import React from "react";
import NearTeams from "@/components/NearTeams";
import Header from "@/components/Header";
import { useAppContext } from "@/contexts/AppContext";

const ProductionTeamPage: React.FC = () => {
  const { mobileMenuOpen, setMobileMenuOpen, navigateToPage, currentPage } = useAppContext();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Header
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        navigateToPage={navigateToPage}
        currentPage={currentPage}
      />

      {/* Hero Section */}
      <section className="pt-18 pb-2 px-6 md:px-12 text-center ">
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Find Video Production Team Near You
        </h1>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 ">
        <NearTeams />
      </main>
    </div>
  );
};

export default ProductionTeamPage;

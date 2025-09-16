'use client'

import React from 'react'
import { useAppContext } from '@/contexts/AppContext'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import WhyChooseUs from '@/components/WhyChooseUs'
import { headerType } from '@/contexts/fromType'

const HomePage: React.FC<headerType> = () => {

  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    currentPage
  } = useAppContext()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Header 
          mobileMenuOpen={mobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          currentPage={currentPage}
        />
        <Hero />
        <Services />
        <WhyChooseUs/>
        <About />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}

export default HomePage
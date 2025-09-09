'use client'
import Link from 'next/link'
import React from 'react'
import { Menu, X, Video, Camera } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

interface HeaderProps {
  mobileMenuOpen: boolean
  toggleMobileMenu: () => void
  navigateToPage: (page: string) => void
  currentPage: string
}

const Header: React.FC<HeaderProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  navigateToPage,
  currentPage
}) => {
  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      navigateToPage('home')
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigateToPage('home')}
          >
            <div className="relative">
              <Video className="h-10 w-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-80 group-hover:scale-125 transition-transform duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              AsanCapture
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <button 
              onClick={() => navigateToPage('home')}
              className="relative px-6 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-lg"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <Link href={"/gallery"}>
          
            <button 
              onClick={() => navigateToPage('gallery')}
              className="relative px-6 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-lg"
            >
              <span className="relative z-10">Gallery</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            </Link>
            <button 
              onClick={() => scrollToSection('services')}
              className="relative px-6 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-lg"
            >
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('about')}
              className="relative px-6 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-lg"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="relative px-6 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-lg"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />


       {/* Join Us Button */}
            <button 
              onClick={() => navigateToPage('hiring')}
              className="hidden md:inline-flex items-center px-4 py-2.5 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-gray-900 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 group"
            >
              <span className="relative z-10">Book Event</span>
            </button>

       
            {/* Book Event Button */}
            <button 
              onClick={() => navigateToPage('join-us')}
              className="hidden md:inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 group"
            >

              <span className="relative z-10"> Join Us</span>
              {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div> */}
            </button>

     
            
            {/* member Button */}
               <Link href={"/member"}>
               
            <button 
              className="hidden md:inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 group"
            >
              <span className="relative z-10">Member</span>
            </button>
               </Link>


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
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-xl animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-2">
              <button 
                onClick={() => navigateToPage('home')}
                className="block w-full text-left px-6 py-4 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-lg group"
              >
                <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">Home</span>
              </button>
                          <Link href={"/gallery"}>
          
            <button 
              onClick={() => navigateToPage('gallery')}
              className="relative px-6 py-3 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group overflow-hidden rounded-lg"
            >
              <span className="relative z-10">Gallery</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            </Link>
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-6 py-4 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-lg group"
              >
                <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">Services</span>
              </button>
              
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-6 py-4 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-lg group"
              >
                <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">About</span>
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-6 py-4 font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 rounded-lg group"
              >
                <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">Contact</span>
              </button>
              
              <div className="flex flex-col space-y-3 mt-6">
                <button 
                  onClick={() => navigateToPage('admin')}
                  className="px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Admin
                </button>
                <button 
                  onClick={() => navigateToPage('operator')}
                  className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Operator
                </button>
                <button 
                  onClick={() => navigateToPage('hiring')}
                  className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Book Event
                </button>
                <button 
                  onClick={() => navigateToPage('join-us')}
                  className="px-6 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-gray-900 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Join Us
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { TeamMember, BookingData } from './fromType'


type ThemeType = 'light' | 'dark' | 'system'

interface AppContextType {
  darkMode: boolean
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
  toggleDarkMode: () => void
  currentPage: string
  setCurrentPage: (page: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  isLoggedIn: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
  userType: 'admin' | 'operator' | 'member'
  setUserType: (type: 'admin' | 'operator' | 'member') => void
  userData: any
  setUserData: (data: any) => void
  navigateToPage: (page: string) => void
  bookings: BookingData[]
  teamMembers: TeamMember[]
  messages: any[]
}





const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {

  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>('system')
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'admin' | 'operator' | 'member'>('admin')
  const [userData, setUserData] = useState<any>(null)

 

  // Function to apply theme to document
  const applyTheme = (isDark: boolean) => {
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Set theme based on user preference or system preference
  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme)
    localStorage.setItem('theme-preference', newTheme)
    
    if (newTheme === 'dark') {
      applyTheme(true)
    } else if (newTheme === 'light') {
      applyTheme(false)
    } else {
      // System preference
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedThemePreference = localStorage.getItem('theme-preference') as ThemeType | null
    
    if (savedThemePreference && ['light', 'dark', 'system'].includes(savedThemePreference)) {
      setThemeState(savedThemePreference as ThemeType)
      
      if (savedThemePreference === 'system') {
        applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
      } else {
        applyTheme(savedThemePreference === 'dark')
      }
    } else {
      // Default to system preference if no saved preference
      setThemeState('system')
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  // Listen for system preference changes when theme is set to 'system'
  useEffect(() => {
    if (theme !== 'system') return
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      applyTheme(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const toggleDarkMode = () => {
    const newTheme = darkMode ? 'light' : 'dark'
    console.log(newTheme)
    setTheme(newTheme)
  }
  
  
  useEffect(() => {
    console.log(theme)
    setTheme(theme)

  }, [theme])
  

  const navigateToPage = (page: string) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    
    // Use window.location for navigation to avoid router issues
    switch (page) {
      case 'home':
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          window.location.href = '/'
        }
        break
      case 'admin':
        if (typeof window !== 'undefined' && window.location.pathname !== '/admin') {
          window.location.href = '/admin'
        }
        break
      case 'operator':
        if (typeof window !== 'undefined' && window.location.pathname !== '/operator') {
          window.location.href = '/operator'
        }
        break
      case 'hiring':
        if (typeof window !== 'undefined' && window.location.pathname !== '/hiring') {
          window.location.href = '/hiring'
        }
        break
      case 'join-us':
        if (typeof window !== 'undefined' && window.location.pathname !== '/join-us') {
          window.location.href = '/join-us'
        }
        break
      default:
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
          window.location.href = '/'
        }
    }
  }

const [bookings, setHiringRequests] = useState<BookingData[]>([]);
const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
const [messages, setMessages] = useState<any[]>([]);

async function getDashboardData() {
  try {
    const res = await fetch("/api/dashboardData", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Failed to fetch dashboard data: ${res.status}`);

    const data = await res.json();
    setHiringRequests(data.hiringRequests || []);
    setTeamMembers(data.joinUsApplicants || []);
    setMessages(data.contactMessages || []);
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
  }
}

useEffect(() => {
  getDashboardData();
}, []);



  const value = {
    darkMode,
    theme,
    setTheme,
    toggleDarkMode,
    currentPage,
    setCurrentPage,
    mobileMenuOpen,
    setMobileMenuOpen,
    isLoggedIn,
    setIsLoggedIn,
    userType,
    setUserType,
    userData,
    setUserData,
    navigateToPage,
    teamMembers,
    bookings,
    messages
  }



  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
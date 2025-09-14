'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { TeamMember,UserType, BookingData } from './fromType'



interface AppContextType {
  currentUserData:TeamMember | null ;
  adminOperatorData:UserType | null ;
  currentPage: string
  setCurrentPage: (page: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  isLoggedIn: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
  userType: 'admin' | 'operator' | 'member'
  setUserType: (type: 'admin' | 'operator' | 'member') => void
  navigateToPage: (page: string) => void
  bookings: BookingData[]
  teamMembers: TeamMember[]
  messages: string[]
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

  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'admin' | 'operator' | 'member'>('admin')
  const [currentUserData, setCurrentUserData] = useState<TeamMember| null >(null)
  const [adminOperatorData, setAdminOperatorData] = useState< UserType | null >(null)
useEffect(() => {
  const storedUser = localStorage.getItem("userData");
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.uType === "member") {
      setCurrentUserData(parsedUser.data.user );
    } else {
      setAdminOperatorData(parsedUser.data.user );
    }
  }
}, []);


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
const [messages, setMessages] = useState<string[]>([]);

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
    currentPage,
    setCurrentPage,
    mobileMenuOpen,
    setMobileMenuOpen,
    isLoggedIn,
    setIsLoggedIn,
    userType,
    setUserType,
    currentUserData,
    adminOperatorData,
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



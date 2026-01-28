'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react'
import { TeamMember, UserType, BookingWithId, bookAssignedTeam, Staff, initialBookingData } from './fromType'

// ✅ Define your context type cleanly
interface AppContextType {
  bookingData: BookingWithId
  setBookingData: Dispatch<SetStateAction<BookingWithId>>

  currentUserData: TeamMember | null
  adminOperatorData: UserType | null
  currentPage: string
  setCurrentPage: (page: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  isLoggedIn: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
  userType: 'admin' | 'operator' | 'member'
  setUserType: (type: 'admin' | 'operator' | 'member') => void
  bookings: BookingWithId[]
  teamMembers: TeamMember[]
  messages: string[]
  hiringRequest: BookingWithId
  setHiringRequest: Dispatch<SetStateAction<BookingWithId>>
  staffs: Staff[]
  handleChange: (path: string, value: string | number | bookAssignedTeam[]) => void
}

// ✅ Provide a default empty context value for type safety
const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
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
  const [currentUserData, setCurrentUserData] = useState<TeamMember | null>(null)
  const [adminOperatorData, setAdminOperatorData] = useState<UserType | null>(null)

  // ✅ Always initialize bookingData with your default shape
  const [bookingData, setBookingData] = useState<BookingWithId>(initialBookingData)
  const [hiringRequest, setHiringRequest] = useState<BookingWithId>(initialBookingData)

  const [bookings, setHiringRequests] = useState<BookingWithId[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [messages, setMessages] = useState<string[]>([])
  const [staffs, setStaffs] = useState<Staff[]>([])

  useEffect(() => {
    const storedUser = localStorage.getItem('userData')
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.uType === 'member') {
        setCurrentUserData(parsedUser.data.user)
      } else {
        setAdminOperatorData(parsedUser.data.user)
      }
    }
  }, [])

  async function getDashboardData() {
    try {
      const res = await fetch('/api/dashboardData', {
        method: 'GET',
        cache: 'no-store',
      })
      if (!res.ok) throw new Error(`Failed to fetch dashboard data: ${res.status}`)

      const data = await res.json()
      setHiringRequests(data.hiringRequests || [])
      setTeamMembers(data.joinUsApplicants || [])
      setMessages(data.contactMessages || [])
      setStaffs(data.staff)
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

const handleChange = (
  path: string,
  value: string | number | bookAssignedTeam[]
) => {
  if (!hiringRequest) return;

  const updated = { ...hiringRequest };
  const keys = path.split(".");

  let obj: Record<string, unknown> = updated;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (typeof obj[key] !== "object" || obj[key] === null) {
      throw new Error(`Invalid path: ${path}`);
    }
    obj = obj[key] as Record<string, unknown>;
  }

  obj[keys[keys.length - 1]] = value;
  setHiringRequest(updated);
};


  // ✅ Provide all values (no missing fields)
  const value: AppContextType = {
    bookingData,
    setBookingData,
    currentUserData,
    adminOperatorData,
    currentPage,
    setCurrentPage,
    mobileMenuOpen,
    setMobileMenuOpen,
    isLoggedIn,
    setIsLoggedIn,
    userType,
    setUserType,
    bookings,
    teamMembers,
    messages,
    hiringRequest,
    setHiringRequest,
    staffs,
    handleChange,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { TeamMember,UserType, BookingData , bookAssignedTeam} from './fromType'
import { Dispatch, SetStateAction } from "react";

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
  bookings: BookingData[]
  teamMembers: TeamMember[]
  messages: string[]
  hiringRequest:BookingData | null 
  setHiringRequest: Dispatch<SetStateAction<BookingData | null>>
  handleChange: (path: string, value: string | number | bookAssignedTeam[]) => void;
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

  const [hiringRequest, setHiringRequest] = useState<BookingData | null>(null);
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

  const value = {
    setHiringRequest,
    hiringRequest,
    handleChange,
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
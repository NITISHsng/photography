'use client'

import { useState } from 'react'
import OperatorPage from '@/mainComponents/OperatorPage'
import LoginPage from '@/mainComponents/LoginPage'
import { AppProvider } from "@/contexts/AppContext";

export default function Operator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.clear();
  }

  if (!isLoggedIn) {
    return (
      <LoginPage 
        onLogin={handleLogin}
      />
    )
  }

  return (
    <AppProvider>
         <OperatorPage  onLogout={handleLogout}/>
      </AppProvider>
  )
}
'use client'

import { useState } from 'react'
import ProfilePage from '@/mainComponents/ProfilePage'
import LoginPage from '@/mainComponents/LoginPage'
import { AppProvider } from "@/contexts/AppContext";


export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

const handleLogin = () => {
  setIsLoggedIn(true)
}

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.clear()
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (

      <AppProvider>
        <ProfilePage  onLogout={handleLogout} />
      </AppProvider>
  );
}

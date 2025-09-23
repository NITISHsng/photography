'use client'

import { useState } from 'react'
import { AppProvider } from "@/contexts/AppContext";
import AdminPage from '@/mainComponents/AdminPage'
import LoginPage from '@/mainComponents/LoginPage'

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
        <AdminPage 
          onLogout={handleLogout}
        />
      </AppProvider>
  )
}


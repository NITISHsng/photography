'use client'

import { useState } from 'react'
import OperatorPage from '@/pages/OperatorPage'
import LoginPage from '@/pages/LoginPage'

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
    <OperatorPage 
      onLogout={handleLogout}
    />
  )
}
'use client'

import { useState } from 'react'
import OperatorPage from '@/pages/OperatorPage'
import LoginPage from '@/pages/LoginPage'

export default function Operator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'admin' | 'operator' | 'member'>('operator')
  const [userData, setUserData] = useState<any>(null)



  const handleLogin = (type: 'admin' | 'operator' | 'member', data: any) => {
    setUserType(type)
    setUserData(data)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType('operator')
    setUserData(null)
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
      userType={userType}
      userData={userData}
      onLogout={handleLogout}
    />
  )
}
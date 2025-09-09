'use client'

import { useState } from 'react'
import AdminPage from '@/pages/AdminPage'
import LoginPage from '@/pages/LoginPage'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'admin' | 'operator' | 'member'>('admin')
  const [userData, setUserData] = useState<any>(null)



  const handleLogin = (type: 'admin' | 'operator' | 'member', data: any) => {
    setUserType(type)
    setUserData(data)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType('admin')
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
    <AdminPage 
      userType={userType}
      userData={userData}
      onLogout={handleLogout}
    />
  )
}
'use client'

import { useState } from 'react'
import ProfilePage from '@/pages/ProfilePage'
import LoginPage from '@/pages/LoginPage'
// import { OperatorUser , AdminUser , TeamMember } from '@/contexts/fromType'

// type User = AdminUser | OperatorUser | TeamMember

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [userType, setUserType] = useState<'admin' | 'operator' | 'member'>('admin')

const handleLogin = () => {
  // setUserType(type)
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
    <div>
        <ProfilePage  onLogout={handleLogout} />
    </div>
  );
}

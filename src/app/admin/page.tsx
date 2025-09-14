'use client'

import { useState } from 'react'
import AdminPage from '@/pages/AdminPage'
import LoginPage from '@/pages/LoginPage'

type AdminUser = {
  id: string
  name: string
  email: string
  role: 'admin'
}

type OperatorUser = {
  id: string
  operatorId: string
  name: string
  email: string
  role: 'operator'
}

type MemberUser = {
  id: string
  memberId: string
  name: string
  email: string
  role: 'member'
}

type User = AdminUser | OperatorUser | MemberUser

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<'admin' | 'operator' | 'member'>('admin')
  const [userData, setUserData] = useState<User | null>(null)

  const handleLogin = (type: 'admin' | 'operator' | 'member', data: User) => {
    setUserType(type)
    setUserData(data)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserType('admin')
    setUserData(null)
    localStorage.clear()
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <AdminPage 
      userType={userType}
      userData={userData}
      onLogout={handleLogout}
    />
  )
}

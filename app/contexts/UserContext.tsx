'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  email: string
  userType: 'PERSONAL' | 'COMPANY'
}

interface UserContextType {
  user: User | null
  login: (email: string, userType: 'PERSONAL' | 'COMPANY') => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, userType: 'PERSONAL' | 'COMPANY') => {
    setUser({ email, userType })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}


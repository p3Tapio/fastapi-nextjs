import React, { createContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { IUser } from '../types'

interface IAuthContext {
  user: IUser | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  signIn: async () => {},
  signOut: () => {},
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)
  const apiUrl = process.env.API_URL

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    setUser(storedUser ? JSON.parse(storedUser) : null)
  }, [])

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      const { data } = await axios.post<IUser>(`${apiUrl}/login`, {
        email,
        password,
      })
      // if data === ??
      window.localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    } catch {
      setUser(null)
    }
  }

  const signOut = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const memoizedProviderValues = useMemo(() => ({ user, signIn, signOut }), [])

  return (
    <AuthContext.Provider value={memoizedProviderValues}>
      {children}
    </AuthContext.Provider>
  )
}

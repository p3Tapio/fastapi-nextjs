import React, { createContext, useEffect, useMemo, useState } from 'react'
import { IUser } from '../types'

interface IAuthContext {
  user: IUser | null
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const defaultState = {
  user: null,
  signIn: async () => {},
  signOut: () => {},
}

export const AuthContext = createContext<IAuthContext>(defaultState)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null)
  const apiUrl = process.env.API_URL

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    setUser(storedUser ? JSON.parse(storedUser) : null)
  }, [])

  const signOut = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
      const userJson = await response.json()
      window.localStorage.setItem('user', JSON.stringify(userJson))
      setUser(userJson)
    } else {
      signOut()
    }
  }

  const memoizedProviderValues = useMemo(
    () => ({ user, signIn, signOut }),
    [user]
  )

  return (
    <AuthContext.Provider value={memoizedProviderValues}>
      {children}
    </AuthContext.Provider>
  )
}

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { IUser } from '../types'

interface IAuthContext {
  user: IUser | undefined
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const defaultState = {
  user: undefined,
  signIn: async () => {},
  signOut: () => {},
}

export const AuthContext = createContext<IAuthContext>(defaultState)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const apiUrl = process.env.API_URL
  const [user, setUser] = useState<IUser | undefined>(
    window.localStorage.getItem('user')
      ? JSON.parse(window.localStorage.getItem('user') || '')
      : undefined
  )

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    setUser(storedUser ? JSON.parse(storedUser) : undefined)
  }, [])

  const signOut = () => {
    window.localStorage.removeItem('user')
    setUser(undefined)
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
      return Promise.resolve()
    }
    signOut()
    return Promise.reject()
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

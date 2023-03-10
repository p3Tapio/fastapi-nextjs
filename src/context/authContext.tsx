import React, { createContext, useEffect, useMemo, useState } from 'react'
import { IAuthDetails } from '../types'

interface IAuthContext {
  authDetails: IAuthDetails | undefined
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const defaultState = {
  authDetails: undefined,
  signIn: async () => {},
  signOut: () => {},
}

export const AuthContext = createContext<IAuthContext>(defaultState)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const apiUrl = process.env.API_URL
  const [authDetails, setUser] = useState<IAuthDetails | undefined>(
    window.localStorage.getItem('auth-details')
      ? JSON.parse(window.localStorage.getItem('auth-details') || '')
      : undefined
  )

  useEffect(() => {
    const storedUser = window.localStorage.getItem('auth-details')
    setUser(storedUser ? JSON.parse(storedUser) : undefined)
  }, [])

  const signOut = () => {
    window.localStorage.removeItem('auth-details')
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
      window.localStorage.setItem('auth-details', JSON.stringify(userJson))
      setUser(userJson)
      return Promise.resolve()
    }
    signOut()
    return Promise.reject()
  }

  const memoizedProviderValues = useMemo(
    () => ({ authDetails, signIn, signOut }),
    [authDetails]
  )

  return (
    <AuthContext.Provider value={memoizedProviderValues}>
      {children}
    </AuthContext.Provider>
  )
}

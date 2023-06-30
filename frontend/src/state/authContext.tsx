import React, { createContext, useEffect, useMemo, useState } from 'react'
import { IAuthDetails } from '../types'
import { isAuthDetails } from '../types/utils'
import { handleRegister, handleSignIn } from './api'

interface IAuthContext {
  authDetails: IAuthDetails | undefined
  register: (username: string, email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const defaultState = {
  authDetails: undefined,
  register: async () => {},
  signIn: async () => {},
  signOut: () => {},
}

export const AuthContext = createContext<IAuthContext>(defaultState)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authDetails, setAuthDetails] = useState<IAuthDetails | undefined>(
    window.localStorage.getItem('auth-details')
      ? JSON.parse(window.localStorage.getItem('auth-details') || '')
      : undefined
  )

  useEffect(() => {
    const storedUser = window.localStorage.getItem('auth-details')
    setAuthDetails(storedUser ? JSON.parse(storedUser) : undefined)
  }, [])

  const handleAuthResponse = async (response: Response) => {
    if (response.ok) {
      const userJson = await response.json()
      if (!isAuthDetails(userJson)) {
        return Promise.reject()
      }
      window.localStorage.setItem('auth-details', JSON.stringify(userJson))
      setAuthDetails(userJson)
      return Promise.resolve()
    }
    return Promise.reject()
  }

  const signOut = () => {
    window.localStorage.removeItem('auth-details')
    setAuthDetails(undefined)
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    const response = await handleSignIn(email, password)
    await handleAuthResponse(response)
  }

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    const response = await handleRegister(username, email, password)
    await handleAuthResponse(response)
  }

  const memoizedProviderValues = useMemo(
    () => ({ authDetails, register, signIn, signOut }),
    [authDetails]
  )

  return (
    <AuthContext.Provider value={memoizedProviderValues}>
      {children}
    </AuthContext.Provider>
  )
}

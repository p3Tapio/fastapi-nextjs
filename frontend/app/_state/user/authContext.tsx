'use client'

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { IAuthDetails } from '../../_types/user'
import { isAuthDetails } from '../../_types/utils'
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
  const [authDetails, setAuthDetails] = useState<IAuthDetails | undefined>(undefined)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthDetails(
        window.localStorage.getItem('auth-details')
          ? JSON.parse(window.localStorage.getItem('auth-details') || '')
          : undefined
      )
    }
  }, [])

  const handleAuthResponse = async (response: Response) => {
    try {
      if (response.ok) {
        const userJson = await response.json()
        const { data } = userJson
        if (!isAuthDetails(data)) {
          return Promise.reject()
        }
        window.localStorage.setItem('auth-details', JSON.stringify(data))
        setAuthDetails(data)
        return Promise.resolve()
      }
      return Promise.reject()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      return Promise.reject()
    }
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
    () => {
      return {
        authDetails,
        register,
        signIn,
        signOut,
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authDetails]
  )

  return (
    <AuthContext.Provider value={memoizedProviderValues}>{children}</AuthContext.Provider>
  )
}

import React, { createContext, useEffect, useMemo, useState } from 'react'
import { IAuthDetails } from '../types'
import { isAuthDetails } from '../types/utils'

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
  const apiUrl = process.env.API_URL
  const baseUrl = `${apiUrl}/user`

  const [authDetails, setAuthDetails] = useState<IAuthDetails | undefined>(
    window.localStorage.getItem('auth-details')
      ? JSON.parse(window.localStorage.getItem('auth-details') || '')
      : undefined
  )

  useEffect(() => {
    const storedUser = window.localStorage.getItem('auth-details')
    setAuthDetails(storedUser ? JSON.parse(storedUser) : undefined)
  }, [])

  const signOut = () => {
    window.localStorage.removeItem('auth-details')
    setAuthDetails(undefined)
  }

  const handleAuthResponse = async (response: Response) => {
    const userJson = await response.json()
    if (!isAuthDetails(userJson)) return Promise.reject()
    window.localStorage.setItem('auth-details', JSON.stringify(userJson))
    setAuthDetails(userJson)
    return Promise.resolve()
  }

  const signIn = async (email: string, password: string): Promise<void> => {
    const response = await fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ email, password }),
    })

    if (response.ok) handleAuthResponse(response)

    signOut()
    return Promise.reject()
  }

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({ username, email, password }),
    })
    if (response.ok) handleAuthResponse(response)

    return Promise.reject()
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

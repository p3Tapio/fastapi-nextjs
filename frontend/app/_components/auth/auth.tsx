'use client'

import React, { useContext, useState } from 'react'
import { redirect } from 'next/navigation'
import { AuthContext } from '../../_state/user/authContext'
import Button from '../../_elements/button/button'
import TextInput from '../../_elements/textInput/textInput'
import './auth.scss'

interface IAuthProps {
  type: 'Sign in' | 'Register'
}

const Auth: React.FC<IAuthProps> = ({ type }) => {
  const { register, signIn, authDetails } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [error, setError] = useState(false)
  const disableSignIn = email === '' || password === ''
  const disableRegister = disableSignIn || username === '' || password !== passwordVerify

  const resetState = () => {
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordVerify('')
  }

  const handleSignIn = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    if (!disableSignIn) {
      try {
        await signIn(email, password)
        resetState()
      } catch {
        setError(true)
      }
    }
  }

  const handleRegister = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()
    if (!disableRegister) {
      try {
        await register(username, email, password)
        resetState()
      } catch {
        setError(true)
      }
    }
  }

  if (typeof authDetails === 'object' && authDetails.accessToken) {
    redirect('/user-page')
  }
  const onSubmit = type === 'Sign in' ? handleSignIn : handleRegister

  return (
    <div className="auth-container">
      <header>
        <h1>{type}</h1>
      </header>
      <form className="auth-container__form" onSubmit={onSubmit}>
        <fieldset>
          {type === 'Register' && (
            <TextInput
              id="auth-username"
              type="text"
              label="Username"
              value={username}
              setValue={setUsername}
            />
          )}
          <TextInput
            id="auth-email"
            type="email"
            label="Email"
            value={email}
            setValue={setEmail}
          />

          <TextInput
            id="auth-password"
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
          {type === 'Register' && (
            <TextInput
              id="auth-password-again"
              type="password"
              label="Password again"
              value={passwordVerify}
              setValue={setPasswordVerify}
            />
          )}
        </fieldset>
        <div className="auth-container__error-message">
          {error && `${type} failed. Try again.`}
        </div>
        <fieldset className="auth-container__buttons">
          <Button
            id="auth-reset"
            theme="secondary"
            label="Reset"
            type="button"
            onClick={resetState}
          />
          <Button
            id="auth-submit"
            theme="primary"
            label={type}
            type="submit"
            disabled={type === 'Register' ? disableRegister : disableSignIn}
          />
        </fieldset>
      </form>
    </div>
  )
}

export default Auth

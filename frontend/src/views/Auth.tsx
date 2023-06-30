import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'state/authContext'
import Button from 'elements/Button'
// import HorizontalLine from '../elements/HorizontalLine'
import TextInput from 'elements/TextInput'
import './views.scss'

interface IAuth {
  type: 'Sign in' | 'Register'
}

const Auth: React.FC<IAuth> = ({ type }) => {
  const { register, signIn, authDetails } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [error, setError] = useState(false)
  const disableSignIn = email === '' || password === ''
  const disableRegister =
    disableSignIn || username === '' || password !== passwordVerify

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

  return authDetails ? (
    <Navigate to="/user-page" replace />
  ) : (
    <div className="auth-container">
      <div className="auth-container__heading">
        <h1 className="auth-container__heading-header">{type}</h1>
        {/* <HorizontalLine width="80%" animated /> */}
      </div>
      <form
        className="auth-container__form"
        onSubmit={(e: React.SyntheticEvent) => {
          if (type === 'Register') handleRegister(e)
          else handleSignIn(e)
        }}
      >
        <div className="auth-container__input-div">
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
        </div>
        <div className="auth-container__error-message">
          {error && `${type} failed. Try again.`}
        </div>
        <div className="auth-container__button-div">
          <Button
            id="auth-reset"
            theme="secondary"
            label="Reset"
            type="button"
            onClick={() => resetState()}
          />
          <Button
            id="auth-submit"
            theme="primary"
            label={type}
            type="submit"
            disabled={type === 'Register' ? disableRegister : disableSignIn}
          />
        </div>
      </form>
    </div>
  )
}

export default Auth

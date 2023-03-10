import React, { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'context/authContext'
import Button from 'elements/Button'
// import HorizontalLine from '../elements/HorizontalLine'
import TextInput from 'elements/TextInput'
import './views.scss'

const SignIn = () => {
  const { signIn, authDetails } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSignIn = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()

    if (email && password && email !== '' && password !== '') {
      try {
        await signIn(email, password)
        setEmail('')
        setPassword('')
      } catch {
        setError(true)
      }
    }
  }

  return authDetails ? (
    <Navigate to="/user-page" replace />
  ) : (
    <div className="signin-container">
      <div className="signin-container__heading">
        <h1 className="signin-container__heading-header">Sign In</h1>
        {/* <HorizontalLine width="80%" animated /> */}
      </div>
      <form
        className="signin-container__form"
        onSubmit={(e: React.SyntheticEvent) => handleSignIn(e)}
      >
        <div className="signin-container__input-div">
          <TextInput
            id="signin-email"
            type="email"
            label="Email"
            value={email}
            setValue={setEmail}
          />

          <TextInput
            id="signin-password"
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="signin-container__error-message">
          {error && 'Sign in failed. Try again.'}
        </div>
        <div className="signin-container__button-div">
          <Button
            id="signin-reset"
            theme="secondary"
            label="Reset"
            type="button"
            onClick={() => {
              setPassword('')
              setEmail('')
              setError(false)
            }}
          />
          <Button
            id="signin-submit"
            theme="primary"
            label="Sign in"
            type="submit"
            disabled={email === '' || password === ''}
          />
        </div>
      </form>
    </div>
  )
}

export default SignIn

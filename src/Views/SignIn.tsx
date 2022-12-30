import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Button from '../elements/Button'
import HorizontalLine from '../elements/HorizontalLine'
import TextInput from '../elements/TextInput'
import './views.scss'

const SignIn = () => {
  const { signIn, user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault()

    if (email && password && email !== '' && password !== '') {
      await signIn(email, password)

      setEmail('')
      setPassword('')
      // TODO: handle wrong credentials
      if (user) {
        navigate('/secret')
      }
      // else {
      //
      // }
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-container__heading">
        <h1>Sign In</h1>
        <HorizontalLine width="80%" animated />
      </div>
      <form
        className="signin-container__form"
        onSubmit={(e: React.SyntheticEvent) => handleSignIn(e)}
      >
        <div className="signin-container__input-div">
          <TextInput
            type="email"
            label="Email"
            value={email}
            setValue={setEmail}
          />

          <TextInput
            type="password"
            label="Password"
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="signin-container__button-div">
          <Button
            theme="secondary"
            label="Reset"
            type="button"
            onClick={() => {
              setPassword('')
              setEmail('')
            }}
          />
          <Button
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

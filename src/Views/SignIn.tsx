import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
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
      console.log('user', user)
      if (user) {
        navigate('/secret')
      }
    }
  }
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={(e: React.SyntheticEvent) => handleSignIn(e)}>
        <label htmlFor="email">
          Email:
          <br />
          <input
            type="email"
            id="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <br />
          <input
            type="password"
            id="password"
            value={password || ''}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Sign in!</button>
      </form>
    </div>
  )
}

export default SignIn

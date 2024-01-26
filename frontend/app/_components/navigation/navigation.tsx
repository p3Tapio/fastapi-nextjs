'use client'

import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../_state/user/authContext'
import './navigation.scss'

const Navigation = () => {
  const { authDetails, signOut } = useContext(AuthContext)

  const handleSignOut = () => {
    signOut()
  }
  if (!authDetails) {
    return (
      <nav>
        <Link className="nav-item" href="/">
          Home
        </Link>
        <div className="nav-item" />
        <div className="nav-item" />
      </nav>
    )
  }

  return (
    <nav className="navbar-container">
      <Link id="home" className="nav-item" href="/">
        Home
      </Link>
      {typeof authDetails === 'object' && authDetails.accessToken ? (
        <>
          <Link id="user-page" className="nav-item" href="/user-page">
            User page
          </Link>
          <button
            id="sign-out"
            className="nav-item"
            type="button"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <Link id="sign-in" className="nav-item" href="/sign-in">
            Sign in
          </Link>
          <Link id="register" className="nav-item" href="/register">
            Register
          </Link>
        </>
      )}
    </nav>
  )
}

export default Navigation

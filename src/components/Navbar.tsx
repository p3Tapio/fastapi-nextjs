import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import './components.scss'

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext)
  return (
    <div className="navbar-container">
      <div className="navbar-container__item">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-container__item">
        <Link to="/public-page">Public Page</Link>
      </div>
      {user ? (
        <>
          <div className="navbar-container__item">
            <Link to="/secrets">Secrets</Link>
          </div>
          <div className="navbar-container__item">
            <button type="button" onClick={signOut}>
              Sign out
            </button>
          </div>
        </>
      ) : (
        <div className="navbar-container__item">
          <Link to="/sign-in">Sign in</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar

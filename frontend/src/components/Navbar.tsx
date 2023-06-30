import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../state/user/authContext'
import createRouteChildren from '../Routes'
import './components.scss'

const Navbar = () => {
  const { authDetails, signOut } = useContext(AuthContext)
  const routes = createRouteChildren(authDetails)

  return (
    <div className="navbar-container">
      <div className="navbar-container__item">
        <Link to="/">Home</Link>
      </div>
      {routes.map(
        (route, i) =>
          route.label && (
            <div
              key={`${route.label}+${i.toString()}`}
              className="navbar-container__item"
            >
              <Link to={route.path}>{route.label}</Link>
            </div>
          )
      )}
      {authDetails && (
        <div className="navbar-container__item">
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar

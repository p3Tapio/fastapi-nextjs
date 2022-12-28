import React from 'react'
import { Link } from 'react-router-dom'
import './elements.scss'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-container__item">
        <Link to="/">Home</Link>
      </div>
      <div className="navbar-container__item">
        <Link to="/page">A Page</Link>
      </div>
      <div className="navbar-container__item">
        <Link to="/another">Another</Link>
      </div>
    </div>
  )
}

export default Navbar

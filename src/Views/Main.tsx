import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './views.scss'

const Main = () => {
  return (
    <div className="main-container">
      <h1>Home</h1>
      <p>Hello</p>
      <Link to="/test">Test</Link>
      <Outlet />
    </div>
  )
}

export default Main

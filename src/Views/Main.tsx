import React from 'react'
import { Outlet } from 'react-router-dom'
import './views.scss'

const Main = () => {
  return (
    <div className="main-container">
      <h1>Home</h1>
      <Outlet />
    </div>
  )
}

export default Main

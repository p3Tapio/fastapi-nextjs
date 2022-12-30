import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import './views.scss'

const Main = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="main-container__content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main

import React, { useContext } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { AuthContext } from 'context/authContext'
import Error404 from 'views/Error404'
import createRouteChildren from 'Routes'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

const Layout = () => {
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

const App = () => {
  const { user } = useContext(AuthContext)
  const children = createRouteChildren(user)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Error404 />,
      children,
    },
  ])

  return <RouterProvider router={router} />
}

export default App

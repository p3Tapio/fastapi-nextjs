import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthContext } from './context/authContext'
import Main from './views/Main'
import Error404 from './views/Error404'
import {
  authenticatedChildren,
  publicChildren,
  unauthenticatedChildren,
} from './Routes'

const App = () => {
  const { user } = useContext(AuthContext)

  const children = publicChildren.concat(
    user ? authenticatedChildren : unauthenticatedChildren
  )

  const Routes = [
    {
      path: '/',
      element: <Main />,
      errorElement: <Error404 />,
      children,
    },
  ]

  const router = createBrowserRouter(Routes)
  return <RouterProvider router={router} />
}

export default App

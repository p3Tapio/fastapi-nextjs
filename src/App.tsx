import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthContext } from './context/authContext'
import Main from './views/Main'
import Error404 from './views/Error404'
import Test from './views/Test'
import AnotherView from './views/AnotherView'
import SignIn from './views/SignIn'

const App = () => {
  const { user } = useContext(AuthContext)
  console.log('user', user)

  const Routes = [
    {
      path: '/',
      element: <Main />,
      errorElement: <Error404 />,
      children: [
        {
          path: 'public-page',
          element: <Test />,
        },
        {
          path: 'secrets', // TODO PrivateRoute component tms, tai Routes = user ? [..] : [..] tai ks loaders: https://reactrouter.com/en/main/route/loader
          element: user ? <AnotherView /> : <Navigate to="/sign-in" replace />,
        },
        {
          path: 'sign-in',
          element: user ? <Navigate to="/" replace /> : <SignIn />,
        },
      ],
    },
  ]
  const router = createBrowserRouter(Routes)

  return <RouterProvider router={router} />
}

export default App

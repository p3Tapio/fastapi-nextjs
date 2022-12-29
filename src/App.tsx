import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './views/Main'
import Error404 from './views/Error404'
import Test from './views/Test'
import AnotherView from './views/AnotherView'
import { AuthContext } from './context/authContext'

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
          path: 'page',
          element: <Test />,
        },
        {
          path: 'another',
          element: <AnotherView />,
        },
      ],
    },
  ]
  const router = createBrowserRouter(Routes)

  return <RouterProvider router={router} />
}

export default App

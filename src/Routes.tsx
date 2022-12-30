import React from 'react'
import { Navigate } from 'react-router-dom'
import Test from './views/Test'
import AnotherView from './views/AnotherView'
import SignIn from './views/SignIn'

// TODO PrivateRoute component tms, tai Routes = user ? [..] : [..] tai ks loaders: https://reactrouter.com/en/main/route/loader

interface IRoutes {
  path: string
  element: React.ReactNode
}

const publicChildren: IRoutes[] = [
  {
    path: 'public-page',
    element: <Test />,
  },
]

const unauthenticatedChildren: IRoutes[] = [
  {
    path: 'sign-in',
    element: <SignIn />,
  },
  {
    path: 'secrets',
    element: <Navigate to="/sign-in" replace />,
  },
]

const authenticatedChildren: IRoutes[] = [
  {
    path: 'sign-in',
    element: <Navigate to="/secrets" replace />,
  },
  {
    path: 'secrets',
    element: <AnotherView />,
  },
]

export { publicChildren, unauthenticatedChildren, authenticatedChildren }

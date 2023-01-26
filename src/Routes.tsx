import React from 'react'
import { Navigate } from 'react-router-dom'
import Test from './views/Test'
import AnotherView from './views/AnotherView'
import SignIn from './views/SignIn'
import { IRouteChildren, IUser } from './types'

const children: IRouteChildren[] = [
  {
    label: 'Public page',
    path: '/public-page',
    element: <Test />,
    type: 'public',
  },
  {
    label: 'Sign in',
    path: '/sign-in',
    element: <SignIn />,
    type: 'unauthenticated',
  },
  {
    label: 'Secret page',
    path: '/secrets',
    element: <AnotherView />,
    type: 'authenticated',
  },
]

const createRouteChildren = (user: IUser | undefined) => {
  return children.reduce<IRouteChildren[]>((acc, route) => {
    switch (route.type) {
      case 'authenticated':
        acc.push(
          user
            ? route
            : { ...route, label: false, element: <Navigate to="/sign-in" /> }
        )
        break
      case 'unauthenticated':
        acc.push(
          user
            ? { ...route, label: false, element: <Navigate to="/secrets" /> }
            : route
        )
        break
      default:
        acc.push(route)
    }
    return acc
  }, [])
}

export default createRouteChildren

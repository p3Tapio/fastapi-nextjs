import React from 'react'
import { Navigate } from 'react-router-dom'
import Test from 'views/Test'
import Auth from 'views/Auth'
import UserPage from 'views/User'
import { IAuthDetails, IRouteChildren } from './types'

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
    element: <Auth type="Sign in" />,
    type: 'unauthenticated',
  },
  {
    label: 'Register',
    path: '/register',
    element: <Auth type="Register" />,
    type: 'unauthenticated',
  },
  {
    label: 'User page',
    path: '/user-page',
    element: <UserPage />,
    type: 'authenticated',
  },
]

const createRouteChildren = (authDetails: IAuthDetails | undefined) => {
  return children.reduce<IRouteChildren[]>((acc, route) => {
    switch (route.type) {
      case 'authenticated':
        acc.push(
          authDetails
            ? route
            : { ...route, label: false, element: <Navigate to="/sign-in" /> }
        )
        break
      case 'unauthenticated':
        acc.push(
          authDetails
            ? { ...route, label: false, element: <Navigate to="/user-page" /> }
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

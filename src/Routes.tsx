import React from 'react'
import Main from './views/Main'
import Error404 from './views/Error404'
import Test from './views/Test'

const Routes = [
  {
    path: '/',
    element: <Main />,
    errorElement: <Error404 />,
    children: [
      {
        path: 'test',
        element: <Test />,
      },
    ],
  },
]

export default Routes

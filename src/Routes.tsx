import React from 'react'
import Main from './Views/Main'
import './styles.scss'
import Error404 from './Views/Error404'
import Test from './Views/Test'

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

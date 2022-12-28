import React from 'react'
import Main from './views/Main'
import Error404 from './views/Error404'
import Test from './views/Test'
import AnotherView from './views/AnotherView'

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

export default Routes

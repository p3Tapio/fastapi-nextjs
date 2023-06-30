import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'state/authContext'

const BigUserComponent = React.lazy(
  () =>
    import(
      'components/BigUserComponent' /* webpackChunkName: "user-components" */
    )
)
const AnotherBigComponent = React.lazy(
  () =>
    import(
      'components/AnotherBigComponent' /* webpackChunkName: "user-components" */
    )
)

const UserPage = () => {
  const { authDetails } = useContext(AuthContext)

  if (!authDetails) return <Navigate to="/sign-in" />
  const { username } = authDetails.user

  return (
    <div>
      <h1>Hello {username}!</h1>
      <React.Suspense fallback={<>...</>}>
        <BigUserComponent />
        <AnotherBigComponent />
      </React.Suspense>
    </div>
  )
}

export default UserPage

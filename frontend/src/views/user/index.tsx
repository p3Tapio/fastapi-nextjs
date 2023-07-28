import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'state/user/authContext'
import HorizontalLine from '../../elements/HorizontalLine'

const UserPosts = React.lazy(
  () =>
    import(
      'views/user/components/UserPosts' /* webpackChunkName: "user-components" */
    )
)

const UserPage = () => {
  const { authDetails } = useContext(AuthContext)

  if (!authDetails) return <Navigate to="/sign-in" />
  const { username } = authDetails.user

  return (
    <div>
      <h1>Hello {username}!</h1>
      <HorizontalLine width="100%" lineheight={1} animated />
      <React.Suspense fallback={<>...</>}>
        <UserPosts />
      </React.Suspense>
    </div>
  )
}

export default UserPage

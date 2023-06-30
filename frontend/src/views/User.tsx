import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'state/user/authContext'
import { getUserPosts } from '../state/post/postSlice'
import { useAppDispatch } from '../state/store'

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
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (authDetails) {
      const { accessToken } = authDetails
      dispatch(getUserPosts(accessToken))
    }
  }, [])

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

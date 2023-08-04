import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'state/user/authContext'
import { getUserPosts } from 'state/post/postSlice'
import { useAppDispatch } from 'state/store'
import { IPost } from 'types/post'

import './userpage.scss'

const UserPosts = React.lazy(
  () =>
    import(
      'views/user/components/UserPosts' /* webpackChunkName: "user-components" */
    )
)

const CreatePostForm = React.lazy(
  () =>
    import(
      'views/user/components/CreatePostForm' /* webpackChunkName: "user-components" */
    )
)

const UserPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [postToUpdate, setPostToUpdate] = useState<IPost | undefined>(undefined)
  const { authDetails } = useContext(AuthContext)
  const dispatch = useAppDispatch()

  if (!authDetails) return <Navigate to="/sign-in" />
  const { username } = authDetails.user

  useEffect(() => {
    if (authDetails) {
      const { accessToken } = authDetails
      dispatch(getUserPosts({ token: accessToken }))
    }
  }, [])

  return (
    <div className="userpage">
      <h1>Hello {username}!</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="userpage-create-new-btn"
        type="button"
      >
        {showForm ? 'Show posts' : 'Create new post'}
      </button>
      <React.Suspense fallback={<>...</>}>
        {showForm || postToUpdate ? (
          <CreatePostForm
            setShowForm={setShowForm}
            setPostToUpdate={setPostToUpdate}
            postToUpdate={postToUpdate}
          />
        ) : (
          <UserPosts setPostToUpdate={setPostToUpdate} />
        )}
      </React.Suspense>
    </div>
  )
}

export default UserPage

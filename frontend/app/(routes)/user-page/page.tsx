'use client'

import React, { useContext, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { AuthContext } from '../../_state/user/authContext'
import { useAppDispatch } from '../../_state/store'
import { IUserPost } from '../../_types/post'
import { getUserPosts } from '../../_state/userPost/userPostSlice'
import CreatePostForm from '../../_components/components/CreatePostForm'
import UserPosts from '../../_components/components/UserPosts'

const UserPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [postToUpdate, setPostToUpdate] = useState<IUserPost | undefined>(undefined)
  const dispatch = useAppDispatch()
  const { authDetails } = useContext(AuthContext)

  useEffect(() => {
    if (typeof authDetails === 'object' && authDetails.accessToken) {
      const { accessToken } = authDetails
      dispatch(getUserPosts({ token: accessToken }))
    }
  }, [authDetails, dispatch])

  if (!authDetails) return null // TODO return <Skeletor />
  if (typeof authDetails === 'string' && authDetails === 'unauthenticated') {
    return redirect('/')
  }
  const toggleShowForm = () => {
    setShowForm(!showForm)
  }

  const { username } = authDetails.user
  return (
    <div className="userpage">
      <h1>Hello {username}!</h1>
      <button
        id="toggle-posts"
        onClick={toggleShowForm}
        className="userpage-toggle-posts"
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

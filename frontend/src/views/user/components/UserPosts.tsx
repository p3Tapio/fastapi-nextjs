import React, { useContext, useEffect } from 'react'
import { getUserPosts } from 'state/post/postSlice'
import { useAppDispatch, useAppSelector } from 'state/store'
import { AuthContext } from 'state/user/authContext'

import './UserPosts.scss'

const UserPosts = () => {
  const dispatch = useAppDispatch()
  const { userPosts } = useAppSelector((reduxState) => reduxState.posts)
  const { authDetails } = useContext(AuthContext)

  useEffect(() => {
    if (authDetails) {
      const { accessToken } = authDetails
      dispatch(getUserPosts(accessToken))
    }
  }, [])

  return (
    <div className="userposts">
      {userPosts &&
        Object.entries(userPosts).map((post) => (
          <div className="userposts-item">
            <div className="userposts-item__title">{post[0]}</div>
            <div className="userposts-item__description">
              {post[1].description}
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserPosts

import React, { useContext } from 'react'
import { useAppDispatch, useAppSelector } from 'state/store'
import { delelePost } from 'state/post/postSlice'
import { AuthContext } from 'state/user/authContext'
import { IPost } from 'types/post'

import './user-components.scss'

const UserPosts = () => {
  const { userPosts } = useAppSelector((reduxState) => reduxState.posts)
  const { authDetails } = useContext(AuthContext)
  const dispatch = useAppDispatch()

  const handleDelete = async (post: IPost) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`You want to delete ${post.title}!!??`)) {
      try {
        if (authDetails) {
          const { accessToken } = authDetails
          await dispatch(
            delelePost({ token: accessToken, id: post.id })
          ).unwrap()
        }
      } catch (error) {
        if (error && error instanceof Error) {
          const { message } = error
          // eslint-disable-next-line no-alert
          window.alert(message || error)
        }
      }
    }
  }

  return (
    <div className="userposts">
      {userPosts &&
        Object.values(userPosts).map((post) => (
          <div key={post.id} className="userposts-item">
            <div className="userposts-item__title">{post.title}</div>
            <div className="userposts-item__description">
              {post.description}
            </div>
            <div className="userposts-item__btn-div">
              <button type="button" onClick={() => handleDelete(post)}>
                delete
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserPosts

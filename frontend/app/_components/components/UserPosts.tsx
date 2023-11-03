import React, { useContext } from 'react'
import { delelePost } from '../../_state/post/postSlice'
import { useAppSelector, useAppDispatch } from '../../_state/store'
import { AuthContext } from '../../_state/user/authContext'
import { IPost } from '../../_types/post'

import './user-components.scss'

interface IUserPosts {
  setPostToUpdate: React.Dispatch<React.SetStateAction<IPost | undefined>>
}

// TODO where to show errors

const UserPosts: React.FC<IUserPosts> = ({ setPostToUpdate }) => {
  const { userPosts } = useAppSelector((reduxState) => {
    return reduxState.posts
  })
  const { authDetails } = useContext(AuthContext)
  const dispatch = useAppDispatch()

  const handleDelete = async (post: IPost) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`You want to delete ${post.title}!!??`)) {
      try {
        if (typeof authDetails === 'object' && authDetails) {
          const { accessToken } = authDetails
          await dispatch(delelePost({ token: accessToken, id: post.id })).unwrap()
        }
      } catch (error) {
        if (error && typeof error === 'object' && 'message' in error) {
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
        Object.values(userPosts).map((post) => {
          return (
            <div key={post.id} className="userposts-item">
              <div className="userposts-item__title">{post.title}</div>
              <div className="userposts-item__description">{post.description}</div>
              <div className="userposts-item__btn-div">
                <button
                  id="delete-post-btn"
                  type="button"
                  onClick={() => {
                    return handleDelete(post)
                  }}
                >
                  delete
                </button>
                <button
                  id="update-post-btn"
                  type="button"
                  onClick={() => {
                    return setPostToUpdate(post)
                  }}
                >
                  update
                </button>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default UserPosts

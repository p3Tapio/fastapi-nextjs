import React, { useContext } from 'react'
import { deletePost } from '../../_state/userPost/userPostSlice'
import { useAppSelector, useAppDispatch } from '../../_state/store'
import { AuthContext } from '../../_state/user/authContext'
import { IUserPost } from '../../_types/post'

import './user-components.scss'
import { removePrivatePost } from '../../_state/publicPost/publicPostSlice'

interface IUserPosts {
  setPostToUpdate: React.Dispatch<React.SetStateAction<IUserPost | undefined>>
}

// TODO where to show errors

const UserPosts: React.FC<IUserPosts> = ({ setPostToUpdate }) => {
  const { posts } = useAppSelector((reduxState) => {
    return reduxState.userPosts
  })
  const { authDetails } = useContext(AuthContext)
  const dispatch = useAppDispatch()

  const handleDelete = async (post: IUserPost) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(`You want to delete ${post.title}!!??`)) {
      try {
        if (typeof authDetails === 'object' && authDetails) {
          const { accessToken } = authDetails
          await dispatch(deletePost({ token: accessToken, id: post.id })).unwrap()
          if (post.public) dispatch(removePrivatePost(post.id))
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
      {posts &&
        Object.values(posts).map((post) => {
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

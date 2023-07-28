import React from 'react'
import { useAppSelector } from 'state/store'

import './user-components.scss'

const UserPosts = () => {
  const { userPosts } = useAppSelector((reduxState) => reduxState.posts)

  return (
    <div className="userposts">
      {userPosts &&
        Object.values(userPosts).map((post) => (
          <div key={post.id} className="userposts-item">
            <div className="userposts-item__title">{post.title}</div>
            <div className="userposts-item__description">
              {post.description}
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserPosts

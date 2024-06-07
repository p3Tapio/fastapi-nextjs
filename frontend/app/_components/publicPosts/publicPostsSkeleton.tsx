import React from 'react'
import './publicPosts.scss'

const PublicPostsSkeleton = () => {
  return (
    <div className="public-posts__posts public-posts-skeletor">
      {[1, 2, 3, 4, 5, 6].map((i) => {
        return (
          <div key={`public-posts-skeletor-${i}`} className="public-posts__posts-item">
            <div className="public-posts__posts-item-title">.</div>
            <div className="public-posts__posts-item-description">.</div>
            <div className="public-posts__posts-item-author">-.</div>
          </div>
        )
      })}
    </div>
  )
}

export default PublicPostsSkeleton

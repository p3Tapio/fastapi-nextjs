'use client'

import React, { useEffect } from 'react'
import useIsClient from '../../_hooks/useIsClient'
import PublicPostsSkeleton from './publicPostsSkeleton'
import { useAppDispatch, useAppSelector } from '../../_state/store'
import { getPublicPosts } from '../../_state/publicPost/publicPostSlice'
import './publicPosts.scss'

const PublicPosts = () => {
  const isClient = useIsClient()
  const dispatch = useAppDispatch()
  const publicPosts = useAppSelector((reduxState) => {
    return reduxState.publicPosts.posts
  })

  useEffect(() => {
    if (isClient && (!publicPosts || !Object.keys(publicPosts).length)) {
      dispatch(getPublicPosts())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient])

  return (
    <div className="public-posts">
      <h2>Public posts</h2>
      {isClient ? (
        <div className="public-posts__posts">
          {Object.values(publicPosts).map((post) => {
            return (
              <div key={post.id} className="public-posts__posts-item">
                <div className="public-posts__posts-item-title">{post.title}</div>
                <div className="public-posts__posts-item-description">
                  {post.description}
                </div>
                <div className="public-posts__posts-item-author">- {post.owner_name}</div>
              </div>
            )
          })}
        </div>
      ) : (
        <PublicPostsSkeleton />
      )}
    </div>
  )
}

export default PublicPosts

'use client'

import { useEffect } from 'react'
import { getPublicPosts } from './_state/publicPost/publicPostSlice'
import { useAppDispatch } from './_state/store'
import variables from './_style/variables.modules.scss'

const Page = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPublicPosts())
  }, [dispatch])

  return <h1 style={{ color: variables.font_color }}>Hello, Next.js!</h1>
}

export default Page

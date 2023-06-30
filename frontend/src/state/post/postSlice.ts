/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPost, IPostState } from 'types/post'
import { handleGetUserPosts } from './api'

const initialState: IPostState = {
  userPosts: {},
  postStatus: 'READY',
  //   publicPosts TODO
}

export const getUserPosts = createAsyncThunk(
  'posts/userposts',
  async (token: string) => {
    const response = await handleGetUserPosts(token)
    const postsJson = await response.json()
    return postsJson
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserPosts.pending, (state) => {
      state.postStatus = 'LOADING'
    })
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      const posts: IPost[] | [] = action.payload
      if (posts.length > 0) {
        posts.forEach((post) => {
          state.userPosts[post.title] = post
        })
      }
      state.postStatus = 'READY'
    })
    builder.addCase(getUserPosts.rejected, (state) => {
      state.postStatus = 'ERROR'
    })
  },
})

// export const { getUserPosts } = postSlice.actions
export default postSlice.reducer

//   reducers: {
//     getUserPosts(state, action: PayloadAction<IPost[]>) {
//       const posts = action.payload
//       posts.forEach((post) => {
//         state.userPosts[post.title] = post
//       })
//     },
//   },

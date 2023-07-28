/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPost, IPostBase, IPostState } from 'types/post'
import { handleCreatePost, handleGetUserPosts } from './api'

const initialState: IPostState = {
  userPosts: {},
  status: 'READY',
  error: false,
  //   publicPosts TODO
}

// https://redux-toolkit.js.org/usage/usage-with-typescript#typing-the-thunkapi-object

export const getUserPosts = createAsyncThunk<
  IPost[],
  { token: string },
  { rejectValue: { status: number; message: string } }
>(
  'posts/get_userposts',
  async (params: { token: string }, { rejectWithValue }) => {
    const { token } = params
    const response = await handleGetUserPosts(token)
    if (response.status === 200) {
      const postsJson = await response.json()
      return postsJson
    }
    return rejectWithValue({
      status: response.status,
      message: response.statusText,
    })
  }
)

export const createPost = createAsyncThunk<
  IPost,
  { token: string; post: IPostBase },
  { rejectValue: { status: number; message: string } }
>(
  'posts/createpost',
  async (params: { token: string; post: IPostBase }, { rejectWithValue }) => {
    const { token, post } = params
    const response = await handleCreatePost(token, post)

    if (response.status === 200) {
      const postJson = await response.json()
      return postJson
    }
    return rejectWithValue({
      status: response.status,
      message: response.statusText,
    })
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserPosts.pending, (state) => {
      state.status = 'LOADING'
    })
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      const posts: IPost[] | [] = action.payload
      if (posts.length > 0) {
        posts.forEach((post) => {
          state.userPosts[post.id] = post
        })
      }
      state.status = 'READY'
    })
    builder.addCase(getUserPosts.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload
      }
      state.status = 'ERROR'
    })
    builder.addCase(createPost.pending, (state) => {
      state.status = 'LOADING'
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      const post: IPost = action.payload
      state.userPosts[post.id] = post
      state.status = 'READY'
    })
    builder.addCase(createPost.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload
      }
      state.status = 'ERROR'
    })
  },
})

// export const { getUserPosts } = postSlice.actions
export default postSlice.reducer

/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPost, IPostBase, IPostState } from 'types/post'
import { handleCreatePost, handleDeletePost, handleGetUserPosts } from './api'

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

export const delelePost = createAsyncThunk<
  { message: string; id: number },
  { token: string; id: number },
  { rejectValue: { status: number; message: string } }
>(
  'posts/deletepost',
  async (params: { token: string; id: number }, { rejectWithValue }) => {
    const { token, id } = params
    const response = await handleDeletePost(token, id)

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
  reducers: {
    clearUserPostsFromState(state) {
      state.userPosts = {}
    },
  },
  extraReducers(builder) {
    // getUserPosts
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
    // createPost
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
    // deletePost
    builder.addCase(delelePost.pending, (state) => {
      state.status = 'LOADING'
    })
    builder.addCase(delelePost.fulfilled, (state, action) => {
      const { id } = action.payload
      delete state.userPosts[id]
      state.status = 'READY'
    })
    builder.addCase(delelePost.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload
      }
      state.status = 'ERROR'
    })
  },
})

export const { clearUserPostsFromState } = postSlice.actions
export default postSlice.reducer

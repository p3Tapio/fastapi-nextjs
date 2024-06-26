import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IUserPost, IUserPostState, IPostUpdate, IPostCreate } from '../../_types/post'
import {
  handleCreatePost,
  handleDeletePost,
  handleGetUserPosts,
  handleUpdatePost,
} from './api'

const initialState: IUserPostState = {
  posts: {},
  status: 'READY',
  error: false,
}

export const getUserPosts = createAsyncThunk<
  IUserPost[],
  { token: string },
  { rejectValue: { status: number; message: string } }
>('posts/get_userposts', async (params: { token: string }, { rejectWithValue }) => {
  const { token } = params
  const response = await handleGetUserPosts(token)

  if (response.ok) {
    const postsJson = await response.json()
    return postsJson.data
  }
  return rejectWithValue({
    status: response.status,
    message: response.statusText,
  })
})

export const createPost = createAsyncThunk<
  IUserPost,
  { token: string; post: IPostCreate },
  { rejectValue: { status: number; message: string } }
>(
  'posts/createpost',
  async (params: { token: string; post: IPostCreate }, { rejectWithValue }) => {
    const { token, post } = params
    const response = await handleCreatePost(token, post)

    if (response.ok) {
      const postJson = await response.json()
      return postJson.data
    }
    return rejectWithValue({
      status: response.status,
      message: response.statusText,
    })
  }
)

export const updatePost = createAsyncThunk<
  { message: string; updatedPost: IUserPost },
  { token: string; post: IPostUpdate },
  { rejectValue: { status: number; message: string } }
>(
  'posts/updatepost',
  async (params: { token: string; post: IPostUpdate }, { rejectWithValue }) => {
    const { token, post } = params
    const response = await handleUpdatePost(token, post)

    if (response.ok) {
      const postJson = await response.json()
      return postJson.data
    }
    return rejectWithValue({
      status: response.status,
      message: response.statusText,
    })
  }
)

export const deletePost = createAsyncThunk<
  { message: string; id: number },
  { token: string; id: number },
  { rejectValue: { status: number; message: string } }
>(
  'posts/deletepost',
  async (params: { token: string; id: number }, { rejectWithValue }) => {
    const { token, id } = params
    const response = await handleDeletePost(token, id)

    if (response.ok) {
      const postJson = await response.json()
      return postJson.data
    }
    return rejectWithValue({
      status: response.status,
      message: response.statusText,
    })
  }
)

const userPostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearUserPostsFromState(state) {
      return { ...state, userPosts: {} }
    },
  },
  extraReducers(builder) {
    // createPost
    builder.addCase(createPost.pending, (state) => {
      return { ...state, status: 'LOADING' }
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      const post: IUserPost = action.payload
      return {
        ...state,
        posts: { ...state.posts, [post.id]: post },
        status: 'READY',
      }
    })
    builder.addCase(createPost.rejected, (state, action) => {
      const error = action.payload || false
      return { ...state, status: 'ERROR', error }
    })

    // getUserPosts
    builder.addCase(getUserPosts.pending, (state) => {
      return { ...state, status: 'LOADING' }
    })
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      const posts: IUserPost[] | [] = action.payload
      const userPosts = posts.reduce<{ [key: number]: IUserPost }>((acc, post) => {
        acc[post.id] = post
        return acc
      }, {})
      return { ...state, posts: userPosts, status: 'READY' }
    })
    builder.addCase(getUserPosts.rejected, (state, action) => {
      const error = action.payload || false
      return { ...state, status: 'ERROR', error }
    })

    // updatePost
    builder.addCase(updatePost.pending, (state) => {
      return { ...state, status: 'LOADING' }
    })
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const { updatedPost } = action.payload
      return {
        ...state,
        posts: { ...state.posts, [updatedPost.id]: updatedPost },
        status: 'READY',
      }
    })
    builder.addCase(updatePost.rejected, (state, action) => {
      const error = action.payload || false
      return { ...state, status: 'ERROR', error }
    })

    // deletePost
    builder.addCase(deletePost.pending, (state) => {
      return { ...state, status: 'LOADING' }
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const { id } = action.payload
      const { [id]: _, ...posts } = state.posts
      return {
        ...state,
        posts,
        status: 'READY',
      }
    })
    builder.addCase(deletePost.rejected, (state, action) => {
      const error = action.payload || false
      return { ...state, status: 'ERROR', error }
    })
  },
})

export const { clearUserPostsFromState } = userPostSlice.actions
export default userPostSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPost, IPostBase, IPostState, IPostUpdate } from '../../_types/post'
import {
  handleCreatePost,
  handleDeletePost,
  handleGetUserPosts,
  handleUpdatePost,
} from './api'

const initialState: IPostState = {
  userPosts: {},
  status: 'READY',
  error: false,
  //   publicPosts TODO
}

export const getUserPosts = createAsyncThunk<
  IPost[],
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
  IPost,
  { token: string; post: IPostBase },
  { rejectValue: { status: number; message: string } }
>(
  'posts/createpost',
  async (params: { token: string; post: IPostBase }, { rejectWithValue }) => {
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
  { message: string; updatedPost: IPost },
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

export const delelePost = createAsyncThunk<
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

const postSlice = createSlice({
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
      const post: IPost = action.payload
      return {
        ...state,
        userPosts: { ...state.userPosts, [post.id]: post },
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
      const posts: IPost[] | [] = action.payload
      const userPosts = posts.reduce<{ [key: number]: IPost }>((acc, post) => {
        acc[post.id] = post
        return acc
      }, {})
      return { ...state, userPosts, status: 'READY' }
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
        userPosts: { ...state.userPosts, [updatedPost.id]: updatedPost },
        status: 'READY',
      }
    })
    builder.addCase(updatePost.rejected, (state, action) => {
      const error = action.payload || false
      return { ...state, status: 'ERROR', error }
    })

    // deletePost
    builder.addCase(delelePost.pending, (state) => {
      return { ...state, status: 'LOADING' }
    })
    builder.addCase(delelePost.fulfilled, (state, action) => {
      const { id } = action.payload
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: unused, ...posts } = state.userPosts
      return {
        ...state,
        userPosts: posts,
        status: 'READY',
      }
    })
    builder.addCase(delelePost.rejected, (state, action) => {
      const error = action.payload || false
      return { ...state, status: 'ERROR', error }
    })
  },
})

export const { clearUserPostsFromState } = postSlice.actions
export default postSlice.reducer

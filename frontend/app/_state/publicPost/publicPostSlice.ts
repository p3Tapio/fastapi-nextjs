import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPublicPost, IPublicPostState } from '../../_types/post'
import { handleGetPublicPosts } from './api'

const initialState: IPublicPostState = {
  posts: {},
  status: 'READY',
  error: false,
}

export const getPublicPosts = createAsyncThunk<
  IPublicPost[],
  void,
  { rejectValue: { status: number; message: string } }
>('posts/get_PublicPosts', async (_, { rejectWithValue }) => {
  const response = await handleGetPublicPosts()

  if (response.ok) {
    const postsJson = await response.json()
    return postsJson.data
  }
  return rejectWithValue({
    status: response.status,
    message: response.statusText,
  })
})

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePrivatePost(state, action) {
      const { [action.payload]: _, ...posts } = state.posts
      return {
        ...state,
        posts,
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getPublicPosts.pending, (state) => {
      return { ...state, status: 'LOADING' }
    })
    builder.addCase(getPublicPosts.fulfilled, (state, action) => {
      const posts: IPublicPost[] | [] = action.payload
      const PublicPosts = posts.reduce<{ [key: number]: IPublicPost }>((acc, post) => {
        acc[post.id] = post
        return acc
      }, {})
      return { ...state, posts: PublicPosts, status: 'READY' }
    })
    builder.addCase(getPublicPosts.rejected, (state, action) => {
      const error = action.payload || false
      return { ...state, status: 'ERROR', error }
    })
  },
})

export const { removePrivatePost } = postSlice.actions
export default postSlice.reducer

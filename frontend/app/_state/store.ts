/* eslint-disable no-underscore-dangle */

import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import userPostReducer from './userPost/userPostSlice'
import publicPostReducer from './publicPost/publicPostSlice'

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION__?: {
    connect: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    send: (action: any, state: any, options?: any, instanceId?: string) => void
  }
}

export const store = configureStore({
  reducer: {
    userPosts: userPostReducer,
    publicPosts: publicPostReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

const instanceId = '1'

if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  window.__REDUX_DEVTOOLS_EXTENSION__.connect()
  window.__REDUX_DEVTOOLS_EXTENSION__.send({ type: 'START' }, {}, {}, instanceId)
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>()
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

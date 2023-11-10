import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import postReducer from './post/postSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>()
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { useDispatch } from 'react-redux'
import tweetsSlice from 'reducers/tweetsSlice'

const makeStore = () =>
  configureStore({
    reducer: {
      tweets: tweetsSlice,
    },
  })

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>

export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const wrapper = createWrapper(makeStore)

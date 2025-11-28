import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/theme'

export const createStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
    },
  })

export type AppStore = ReturnType<typeof createStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

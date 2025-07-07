import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/theme'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

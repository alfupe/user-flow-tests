import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ThemeState {
  value: 'light' | 'dark'
}

const initialState: ThemeState = {
  value: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.value = state.value === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.value = action.payload
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const selectTheme = (state: RootState) => state.theme.value

export default themeSlice.reducer

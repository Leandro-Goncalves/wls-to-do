import { createSlice } from '@reduxjs/toolkit'
import { dark, light } from '../styles/theme'

const ThemeSwitch = createSlice({
  name: 'ThemeSwitch',
  initialState: {
    theme: light
  },
  reducers: {
    toggle(state) {
      state.theme = state.theme.title === 'light' ? dark : light
    }
  }
})

export const { toggle } = ThemeSwitch.actions
export default ThemeSwitch.reducer

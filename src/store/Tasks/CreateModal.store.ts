import { createSlice } from '@reduxjs/toolkit'

const createModal = createSlice({
  name: 'createModal',
  initialState: {
    isOpen: false
  },
  reducers: {
    open(state) {
      state.isOpen = true
    },
    close(state) {
      state.isOpen = false
    }
  }
})

export const { open, close } = createModal.actions
export default createModal.reducer

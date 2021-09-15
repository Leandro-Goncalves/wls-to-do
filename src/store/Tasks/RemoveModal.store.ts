import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const removeModal = createSlice({
  name: 'removeModal',
  initialState: {
    guid: '',
    isOpen: false
  },
  reducers: {
    open(state, action: PayloadAction<string>) {
      state.isOpen = true
      state.guid = action.payload
    },
    close(state) {
      state.isOpen = false
      state.guid = ''
    }
  }
})

export const { open, close } = removeModal.actions
export default removeModal.reducer

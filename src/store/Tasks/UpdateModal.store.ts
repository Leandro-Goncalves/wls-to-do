import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type task = {
  guid: string
  title: string
  description: string
  situation: 'uncompleted' | 'completed'
}
const updateModal = createSlice({
  name: 'updateModal',
  initialState: {
    isOpen: false,
    data: {} as task
  },
  reducers: {
    open(state, action: PayloadAction<task>) {
      state.isOpen = true
      state.data = action.payload
    },
    close(state) {
      state.isOpen = false
      state.data = {} as task
    }
  }
})

export const { open, close } = updateModal.actions
export default updateModal.reducer

import { createSlice } from '@reduxjs/toolkit'
import { userPatch } from './userAPI'
import { sendMessage } from '../message/messageSlice'

const initialState = {
  status: 'idle',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userPatch.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userPatch.fulfilled, (state, action) => {
        state.status = 'idle'
        if (action.payload.status === 'success') {
          action.asyncDispatch(sendMessage('Zaktualizowano dane'))
        } else {
          action.asyncDispatch(sendMessage(action.payload.message))
        }
      })
  },
})

export const { resetMessage } = userSlice.actions

export const selectStatus = (state) => state.user.status

export default userSlice.reducer

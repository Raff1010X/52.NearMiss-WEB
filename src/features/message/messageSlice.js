import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: '',
    function: '',
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            state.message = action.payload
            state.function = ''
        },
        sendQuestion: (state, action) => {
            state.message = action.payload.message
            state.function = action.payload.function
        },
    },
})

export const { sendMessage, sendQuestion } = messageSlice.actions

export const selectMessage = (state) => state.message.message
export const selectFunction = (state) => state.message.function

export default messageSlice.reducer

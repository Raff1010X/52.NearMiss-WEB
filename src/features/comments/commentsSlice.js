import { createSlice } from '@reduxjs/toolkit'
import { sendMessage } from './../message/messageSlice'
import { getCommentsAsync, deleteCommentsAsync, patchCommentsAsync, postCommentsAsync } from './commentsAPI'

const initialState = {
    status: 'idle',
    comments: [],
    reportId: 0,
}

export const commentsSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setReportId: (state, action) => {
            state.reportId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentsAsync.pending, (state) => {
                state.status = 'loading'
                state.comments = []
            })
            .addCase(getCommentsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
                if (action.payload.data && action.payload.data.length > 0 && action.payload.data[0].data !== 'NULL') {
                    state.comments = action.payload.data
                }
            })
            .addCase(getCommentsAsync.rejected, (state, action) => {
                state.status = 'failed'
                
                action.asyncDispatch(sendMessage('Błąd serwera...'))
            })

            .addCase(deleteCommentsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteCommentsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
                if (action.payload.status === 'success' && action.payload.data[0].x_comment_delete) {
                    action.asyncDispatch(sendMessage('Komentarz został usunięty'))
                    action.asyncDispatch(getCommentsAsync(state.reportId))
                }
            })
            .addCase(deleteCommentsAsync.rejected, (state, action) => {
                state.status = 'failed'
                
                action.asyncDispatch(sendMessage('Błąd serwera...'))
            })

            .addCase(patchCommentsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(patchCommentsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
                if (action.payload.status === 'success' && action.payload.data[0].x_comment_update) {
                    action.asyncDispatch(sendMessage('Zaktualizowano komentarz'))
                    action.asyncDispatch(getCommentsAsync(state.reportId))
                }
            })
            .addCase(patchCommentsAsync.rejected, (state, action) => {
                state.status = 'failed'
                
                action.asyncDispatch(sendMessage('Błąd serwera...'))
            })

            .addCase(postCommentsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(postCommentsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
                if (action.payload.status === 'success' && action.payload.data[0].x_comment_create) {
                    action.asyncDispatch(sendMessage('Dodano komentarz'))
                    action.asyncDispatch(getCommentsAsync(state.reportId))
                }
            })
            .addCase(postCommentsAsync.rejected, (state, action) => {
                state.status = 'failed'
                
                action.asyncDispatch(sendMessage('Błąd serwera...'))
            })
    },
})

export const { setReportId } = commentsSlice.actions

export const selectReportId = (state) => state.comments.reportId
export const selectComments = (state) => state.comments.comments

export default commentsSlice.reducer

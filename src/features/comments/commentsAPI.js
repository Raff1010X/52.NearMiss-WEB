import { API } from '../../api/API'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getCommentsAsync = createAsyncThunk('register/fetchGetComments', async (data) => {
    const response = await API.makeGet(`/api/comments/report/${data}`)
    return response
})

export const postCommentsAsync = createAsyncThunk('register/fetchPostComments', async (data) => {
    const response = await API.makePost(`/api/comments/`, data)
    return response
})

export const patchCommentsAsync = createAsyncThunk('register/fetchPatchComments', async (data) => {
    const response = await API.makePatch(`/api/comments/${data.id}`, data)
    return response
})

export const deleteCommentsAsync = createAsyncThunk('register/fetchDeleteComments', async (data) => {
    const response = await API.makeDelete(`/api/comments/${data}`)
    return response
})

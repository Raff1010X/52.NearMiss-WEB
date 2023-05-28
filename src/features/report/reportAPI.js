import { API } from '../../api/API'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const reportPostAsync = createAsyncThunk('report/fetchPostReport', async (data) => {
    const response = await API.makePost('/api/reports', data)
    return response
})

export const reportPatchAsync = createAsyncThunk('report/fetchPatchReport', async (data) => {
    const response = await API.makePatch(`/api/reports/${data['Numer zgłoszenia']}`, data)
    return response
})

export const filePostAsync = createAsyncThunk('report/fetchFile', async (data) => {
    const response = await API.makePost('/api/file', data)
    return response
})

import { API } from './API'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getDepartmentsAsync = createAsyncThunk('other/fetchGetDepartments', async () => {
    const response = await API.makeGet('/api/departments')
    return response
})

export const getThreatsAsync = createAsyncThunk('other/fetchGetThreats', async () => {
    const response = await API.makeGet('/api/other/threats')
    return response
})

export const getConsequencesAsync = createAsyncThunk('other/fetchGetConsequences', async () => {
    const response = await API.makeGet('/api/other/consequences')
    return response
})

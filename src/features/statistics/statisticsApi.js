import { API } from '../../api/API'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchReportsDoneAsync = createAsyncThunk('statistics/fetchReportsDone', async () => {
    const response = await API.makeGet('/api/reports/done')
    return response
})

export const fetchReportsPostAsync = createAsyncThunk('statistics/fetchReportsPost', async () => {
    const response = await API.makeGet('/api/reports/post')
    return response
})

export const fetchStatsAsync = createAsyncThunk('statistics/fetchStats', async (data) => {
    const response = await API.makeGet(`/api/reports/stats${data}`)
    return response
})

export const fetchReportsToDepartmentAsync = createAsyncThunk('statistics/fetchReportsToDepartment', async (data) => {
    const response = await API.makeGet(`/api/reports/todepartment${data}`)
    return response
})

export const fetchReportsByDepartmentAsync = createAsyncThunk('statistics/fetchReportsByDepartment', async (data) => {
    const response = await API.makeGet(`/api/reports/bydepartment${data}`)
    return response
})

export const fetchTop10Async = createAsyncThunk('statistics/fetchTop10', async (data) => {
    const response = await API.makeGet(`/api/users/top10${data}`)
    return response
})

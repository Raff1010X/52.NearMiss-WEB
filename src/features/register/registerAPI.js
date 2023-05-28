import { API } from '../../api/API'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const searchAsync = createAsyncThunk('register/fetchSearch', async (data) => {
    const urls = [`/api/reports${data}`, `/api/reports/count${data}`]
    const response = await Promise.all(urls.map((url) => API.makeGet(url).then((response) => response))).then(
        (result) => {
            return { status: 'success', lenght: result[1].data[0].x_reports_all_count, data: result[0].data }
        }
    )
    return response
})

export const executedAsync = createAsyncThunk('register/fetchExecuted', async (data) => {
    const response = await API.makePost(`/api/reports/${data}`)
    return response
})

export const deleteAsync = createAsyncThunk('register/fetchDelete', async (data) => {
    const response = await API.makeDelete(`/api/reports/${data}`)
    return response
})

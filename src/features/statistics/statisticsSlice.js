import { createSlice } from '@reduxjs/toolkit'
import {
    fetchReportsDoneAsync,
    fetchReportsPostAsync,
    fetchStatsAsync,
    fetchReportsToDepartmentAsync,
    fetchReportsByDepartmentAsync,
    fetchTop10Async,
} from './statisticsApi'
// import { sendMessage } from '../message/messageSlice'

const initialState = {
    reportsDone: [],
    reportsPost: [],
    reportsStats: [],
    reportsToDepartment: [],
    reportsByDepartment: [],
    top10: '',
    page: 1,
    rangeValues: [-1, -1],
}

export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload
        },
        setRangeValues: (state, action) => {
            state.rangeValues = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // ----------- reports done
            .addCase(fetchReportsDoneAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchReportsDoneAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    state.reportsDone = action.payload.data.map((el) => {
                        return { date: `${el.mon}.${el.yyyy.toString().slice(2)}`, done: el['Liczba zgłoszeń wykonanych'] }
                    })
                }
                if (action.payload.status === 'error') {
                    // action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
            .addCase(fetchReportsDoneAsync.rejected, (state, action) => {
                state.status = 'failed'
                // action.asyncDispatch(sendMessage(action.error.message))
            })
            // ---------- reports post
            .addCase(fetchReportsPostAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchReportsPostAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    state.reportsPost = action.payload.data.map((el) => {
                        return { date: `${el.mon}.${el.yyyy.toString().slice(2)}`, post: el['Liczba zgłoszeń'] }
                    })
                }
                if (action.payload.status === 'error') {
                    // action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
            .addCase(fetchReportsPostAsync.rejected, (state, action) => {
                state.status = 'failed'
                // action.asyncDispatch(sendMessage(action.error.message))
            })
            // ---------- reposts stats
            .addCase(fetchStatsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchStatsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    const reports = action.payload.data[0]['Liczba zgłoszeń']
                    const reportsDone = action.payload.data[0]['Liczba zgłoszeń wykonanych']
                    const reportsNotDone = reports - reportsDone
                    state.reportsStats = [
                        { name: 'Wykonane', value: reportsDone },
                        { name: 'Niewykonane', value: reportsNotDone },
                    ]
                }
                if (action.payload.status === 'error') {
                    // action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
            .addCase(fetchStatsAsync.rejected, (state, action) => {
                state.status = 'failed'
                // action.asyncDispatch(sendMessage(action.error.message))
            })
            // ---------- reposts to deprtment
            .addCase(fetchReportsToDepartmentAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchReportsToDepartmentAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    state.reportsToDepartment = action.payload.data.filter((el) => Number(el['Liczba zgłoszeń']) >= 1)
                }
                if (action.payload.status === 'error') {
                    // action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
            .addCase(fetchReportsToDepartmentAsync.rejected, (state, action) => {
                state.status = 'failed'
                // action.asyncDispatch(sendMessage(action.error.message))
            })
            // ---------- reposts by deprtment
            .addCase(fetchReportsByDepartmentAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchReportsByDepartmentAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    state.reportsByDepartment = action.payload.data.filter(
                        (el) => Number(el['Liczba zgłoszeń przez dział']) >= 1
                    )
                }
                if (action.payload.status === 'error') {
                    // action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
            .addCase(fetchReportsByDepartmentAsync.rejected, (state, action) => {
                state.status = 'failed'
                // action.asyncDispatch(sendMessage(action.error.message))
            })
            // ---------- top 10 users
            .addCase(fetchTop10Async.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTop10Async.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    state.top10 = action.payload.data
                }
                if (action.payload.status === 'error') {
                    // action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
            .addCase(fetchTop10Async.rejected, (state, action) => {
                state.status = 'failed'
                console.log('X')
                // action.asyncDispatch(sendMessage(action.error.message))
            })
    },
})

export const { setPage, setRangeValues } = statisticsSlice.actions

export const selectReportsDone = (state) => state.statistics.reportsDone
export const selectReportsPost = (state) => state.statistics.reportsPost
export const selectReportsStats = (state) => state.statistics.reportsStats
export const selectReportsToDepartment = (state) => state.statistics.reportsToDepartment
export const selectReportsByDepartment = (state) => state.statistics.reportsByDepartment
export const selectTop10 = (state) => state.statistics.top10
export const selectPage = (state) => state.statistics.page
export const selectRangeValues = (state) => state.statistics.rangeValues

export default statisticsSlice.reducer

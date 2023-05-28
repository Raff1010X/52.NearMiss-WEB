import { createSlice } from '@reduxjs/toolkit'
import { sendMessage } from '../features/message/messageSlice'
import { getConsequencesAsync, getDepartmentsAsync, getThreatsAsync } from './otherAPI'

const initialState = {
    status: 'idle',
    consequences: [],
    departments: [],
    threats: [],
}

export const otherSlice = createSlice({
    name: 'other',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getConsequencesAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getConsequencesAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
                if (action.payload.data && action.payload.data.length > 0 && action.payload.data[0].data !== 'NULL') {
                    state.consequences = action.payload.data
                }
            })
            .addCase(getConsequencesAsync.rejected, (state, action) => {
                state.status = 'failed'
                action.asyncDispatch(sendMessage('Błąd serwera...'))
            })

            .addCase(getDepartmentsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getDepartmentsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
                if (action.payload.data && action.payload.data.length > 0 && action.payload.data[0].data !== 'NULL') {
                    state.departments = action.payload.data
                }
            })
            .addCase(getDepartmentsAsync.rejected, (state, action) => {
                state.status = 'failed'
                action.asyncDispatch(sendMessage('Błąd serwera...'))
            })

            .addCase(getThreatsAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getThreatsAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
                if (action.payload.data && action.payload.data.length > 0 && action.payload.data[0].data !== 'NULL') {
                    state.threats = action.payload.data
                }
            })
            .addCase(getThreatsAsync.rejected, (state, action) => {
                state.status = 'failed'
                action.asyncDispatch(sendMessage('Błąd serwera...'))
            })
    },
})

export const selectConsequences = (state) => state.other.consequences
export const selectDepartments = (state) => state.other.departments
export const selectThreats = (state) => state.other.threats

export default otherSlice.reducer

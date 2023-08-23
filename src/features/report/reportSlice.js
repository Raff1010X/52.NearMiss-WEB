import { createSlice } from '@reduxjs/toolkit'

import { reportPostAsync, filePostAsync, reportPatchAsync } from './reportAPI'
import { sendMessage } from '../message/messageSlice'

export const uriBlank = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D'

const dateNow = new Date(Date.now()).toISOString().substring(0, 10)
const timeNow = new Date(Date.now()).toLocaleTimeString().substring(0, 5)

const initialState = {
    status: 'idle',
    message: '',
    report: {
        Zgłaszający: 'yagni@com.pl',
        Dział: '',
        Miejsce: '',
        'Data zdarzenia': dateNow,
        'Godzina zdarzenia': timeNow,
        Zagrożenie: '',
        'Opis Zagrożenia': '',
        Konsekwencje: '',
        Skutek: '',
        'Działania do wykonania': '',
        Zdjęcie: '',
        uri: uriBlank,
    },
    uri: uriBlank,
    number: 0,
    newFile: false,
}

const reportPosted = (action, state, fileError = '') => {
    action.asyncDispatch(
        sendMessage(`Dziękujemy za zgłoszenie. Numer Twojego zgłoszenia:  ${state.number}. ${fileError}`)
    )
}

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReport: (state, action) => {
            state.report = { ...state.report, ...action.payload }
        },
        resetReport: (state) => {
            state.report = initialState.report
        },
        setUri: (state, action) => {
            state.uri = action.payload
        },
        resetUri: (state) => {
            state.uri = uriBlank
            state.message = ''
        },
        setNewFile: (state, action) => {
            state.newFile = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // __________________________________________________________ report
            .addCase(reportPostAsync.pending, (state) => {
                state.status = 'loading'
                state.message = ''
            })
            .addCase(reportPostAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'saved') {
                    state.message = 'ok'
                    action.asyncDispatch(sendMessage('Zgłoszenie zapisano do pamięci podręcznej, przy ponownym połączeniu z serwerem zostanie wysłane do zarejestrowania w bazie danych'))
                    if (state.report['Zdjęcie']) {
                        action.asyncDispatch(
                            filePostAsync({
                                name: state.report['Zdjęcie'],
                                data: state.uri,
                            })
                        )
                    }
                }
                if (action.payload.status === 'success') {
                    state.number = action.payload.data[0].x_report_create
                    if (state.report['Zdjęcie']) {
                        action.asyncDispatch(
                            filePostAsync({
                                name: state.report['Zdjęcie'],
                                data: state.uri,
                            })
                        )
                    } else {
                        state.message = 'ok'
                        reportPosted(action, state)
                    }
                }
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
            .addCase(reportPostAsync.rejected, (state, action) => {
                state.status = 'failed'
                action.asyncDispatch(sendMessage(action.error.message))
            })
            // __________________________________________________________ report edited
            .addCase(reportPatchAsync.pending, (state) => {
                state.status = 'loading'
                state.message = ''
            })
            .addCase(reportPatchAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    state.number = state.report['Numer zgłoszenia']
                    if (state.report['Zdjęcie'] && state.newFile) {
                        action.asyncDispatch(
                            filePostAsync({
                                name: state.report['Zdjęcie'],
                                data: state.uri,
                            })
                        )
                    } else {
                        state.message = 'ok'
                        reportPosted(action, state)
                    }
                }
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
            .addCase(reportPatchAsync.rejected, (state, action) => {
                state.status = 'failed'
                action.asyncDispatch(sendMessage(action.error.message))
            })
            // __________________________________________________________ file
            .addCase(filePostAsync.pending, (state) => {
                state.status = 'loading'
                state.message = ''
            })
            .addCase(filePostAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'saved') {
                    state.message = 'ok'
                }
                if (action.payload.status === 'success') {
                    state.message = 'ok'
                    reportPosted(action, state)
                }
                if (action.payload.status === 'error') {
                    reportPosted(
                        action,
                        state,
                        'Niestety plik ze zdjęciem sie został przesłany.'
                    )
                }
            })
            .addCase(filePostAsync.rejected, (state, action) => {
                state.status = 'failed'
                action.asyncDispatch(sendMessage(action.error.message))
            })
    },
})

export const { setReport, resetReport, setUri, resetUri, setNewFile } = reportSlice.actions

export const selectStatus = (state) => state.report.status
export const selectMessage = (state) => state.report.message
export const selectReport = (state) => state.report.report
export const selectUri = (state) => state.report.uri
export const selectNewFile = (state) => state.report.newFile

export const postNewReport = () => (dispatch, getState) => {
    const report = selectReport(getState())

    dispatch(reportPostAsync(report))
}

export const patchEditedReport = () => (dispatch, getState) => {
    const report = selectReport(getState())
    dispatch(reportPatchAsync(report))
}

export default reportSlice.reducer

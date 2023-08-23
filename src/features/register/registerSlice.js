import { createSlice } from '@reduxjs/toolkit'

import { sendMessage } from './../message/messageSlice'

import { searchAsync, executedAsync, deleteAsync } from './registerAPI'


const initialState = {
    status: 'idle',
    reports: '',
    pageFallback: 1,
    page: 1,
    pages: 0,
    indexFallback: 0,
    index: 0,
    numberOfReports: 0,
    searchString: '?limit=10&offset=0&order=Numer zgłoszenia&desc=true',
    noData: false,
    orderBy: 'Numer zgłoszenia',
    descending: true,
    column: 'Opis Zagrożenia',
    tableView: true,
    content: '--text',
    update: false,
    imageSize: 'report-view__image-img',
    scrollTop: 0,
}

const columns = ['Opis Zagrożenia', 'Skutek', 'Działania do wykonania']

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setSelectedPage: (state, action) => {
            state.pageFallback = state.page
            state.page = action.payload
        },
        setSearchString: (state, action) => {
            state.searchString = action.payload
        },
        setOrderBy: (state, action) => {
            state.orderBy = action.payload
        },
        setDescending: (state, action) => {
            state.descending = action.payload
        },
        setIndex: (state, action) => {
            state.indexFallback = state.index
            state.index = action.payload
        },
        nextIndex: (state) => {
            if ((state.page - 1) * 10 + state.index + 2 > state.numberOfReports) {
                return
            } else if (state.index < 9) {
                state.indexFallback = state.index
                state.index = state.index + 1
            } else if (state.page < state.pages) {
                state.indexFallback = state.index
                state.index = 0
                state.pageFallback = state.page
                state.page = state.page + 1
                state.noData = true
                state.pages = 0
                state.reports = ''
            }
        },
        prevIndex: (state) => {
            if ((state.page - 1) * 10 + state.index - 1 < 0) {
                return
            } else if (state.index > 0) {
                state.indexFallback = state.index
                state.index = state.index - 1
            } else if (state.page > 0) {
                state.indexFallback = state.index
                state.index = 9
                state.pageFallback = state.page
                state.page = state.page - 1
                state.noData = true
                state.pages = 0
                state.reports = ''
            }
        },
        clearReports: (state) => {
            state.noData = true
            state.pages = 0
            state.reports = ''
            state.index = 0
        },
        changeTableView: (state, action) => {
            state.tableView = action.payload
        },
        setNextColumn: (state) => {
            let index = columns.indexOf(state.column)
            index = index + 1
            if (index + 1 > 3) index = 0
            state.column = columns[index]
        },
        setContent: (state, action) => {
            state.content = action.payload
        },
        setUpdate: (state) => {
            state.reports = ''
            state.update = !state.update
        },
        setImageSize: (state, action) => {
            state.imageSize = action.payload
        },
        setScrollTop: (state, action) => {
            state.scrollTop = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchAsync.pending, (state) => {
                state.status = 'loading'
                state.noData = false
            })
            .addCase(searchAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                } else {
                    if (action.payload.data[0].data === 'NULL') {
                        state.noData = true
                        state.pages = 0
                        state.reports = ''
                    } else {
                        state.noData = false
                        state.reports = action.payload.data
                        state.pages = Math.ceil(action.payload.lenght / 10)
                        state.numberOfReports = action.payload.lenght
                    }
                }
            })
            .addCase(searchAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.page = state.pageFallback
                state.index = state.indexFallback
                if (state.index === 0 ) state.noData = true
                else state.noData = false
                action.asyncDispatch(sendMessage("Błąd serwera..."))
            })

            .addCase(executedAsync.pending, (state) => {
                state.status = 'loading'
                state.noData = false
            })
            .addCase(executedAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                } else {
                    if (action.payload.status === 'saved') {
                        action.asyncDispatch(sendMessage('Zgłoszenie zapisano do pamięci podręcznej, przy ponownym połączeniu z serwerem zostanie wysłane do zarejestrowania jako wykonane'))
                        action.asyncDispatch(setUpdate())
                    } else                    
                    if (action.payload.data[0].x_report_executed === true) {
                        action.asyncDispatch(sendMessage('Zgłoszenie zarejestrowano jako wykonane'))
                        action.asyncDispatch(setUpdate())
                    }
                }
            })
            .addCase(executedAsync.rejected, (state, action) => {
                state.status = 'failed'
                action.asyncDispatch(sendMessage('Błąd serwera...'))
            })

            .addCase(deleteAsync.pending, (state) => {
                state.status = 'loading'
                state.noData = false
            })
            .addCase(deleteAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    action.asyncDispatch(sendMessage(action.payload.message))
                } else {
                    if (action.payload.data[0].x_report_delete === true) {
                        action.asyncDispatch(sendMessage('Zgłoszenie zostało usnięte'))
                        action.asyncDispatch(setUpdate())
                        action.asyncDispatch(changeTableView(true))
                    }
                }
            })
            .addCase(deleteAsync.rejected, (state, action) => {
                state.status = 'failed'
                
                action.asyncDispatch(sendMessage('Błąd serwera...'))
            })
    },
})

export const {
    setSelectedPage,
    clearReports,
    setSearchString,
    setOrderBy,
    setDescending,
    setNextColumn,
    changeTableView,
    setIndex,
    nextIndex,
    prevIndex,
    setContent,
    setUpdate,
    setImageSize,
    setScrollTop,
} = registerSlice.actions

export const selectStatus = (state) => state.register.status
export const selectReports = (state) => state.register.reports
export const selectPage = (state) => state.register.page
export const selectPages = (state) => state.register.pages
export const selectIndex = (state) => state.register.index
export const selectNumberOfReports = (state) => state.register.numberOfReports
export const selectSearchString = (state) => state.register.searchString
export const selectNodata = (state) => state.register.noData
export const selectOrderBy = (state) => state.register.orderBy
export const selectDescending = (state) => state.register.descending
export const selectColumn = (state) => state.register.column
export const selectTableView = (state) => state.register.tableView
export const selectContent = (state) => state.register.content
export const selectUpdate = (state) => state.register.update
export const selectImageSize = (state) => state.register.imageSize
export const selectScrollTop = (state) => state.register.scrollTop

// export const searchReports = () => (dispatch, getState) => {
//     // const report = selectReport(getState())
//     // dispatch(reportPostAsync(report))
// }

export default registerSlice.reducer

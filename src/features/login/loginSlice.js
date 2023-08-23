import { createSlice } from '@reduxjs/toolkit'

import { sendMessage } from './../message/messageSlice'

import {
    userLogInAsync,
    userLogOutAsync,
    userSignInAsync,
    userForgotPasswordAsync,
    userMeAsync,
    activateAccountAsync,
    resetPasswordAsync,
} from './loginAPI'

const initialState = {
    status: 'idle',
    userIsLogged: false,
    user: {
        email: '',
        role: '',
        department: '',
    },
    message: '',
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetLoginMessage: (state) => {
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogInAsync.pending, (state) => {
                state.status = 'loading'
                state.userIsLogged = false
            })
            .addCase(userLogInAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'error') {
                    state.userIsLogged = false
                    action.asyncDispatch(sendMessage(action.payload.message))
                } else {
                    state.userIsLogged = true
                }
            })
            .addCase(userLogOutAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userLogOutAsync.fulfilled, (state) => {
                state.status = 'idle'
                state.userIsLogged = false
                state.user.email = ''
                state.user.role = ''
                state.user.department = ''
            })
            .addCase(userLogOutAsync.rejected, (state) => {
                state.status = 'idle'
                state.userIsLogged = false
                state.user.email = ''
                state.user.role = ''
                state.user.department = ''
            })
            .addCase(userSignInAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userSignInAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                action.asyncDispatch(sendMessage(action.payload.message))
            })
            .addCase(userForgotPasswordAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userForgotPasswordAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                action.asyncDispatch(sendMessage(action.payload.message))
            })
            .addCase(userMeAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userMeAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    state.userIsLogged = true
                    state.user.email = action.payload.data[0]['Adres email']
                    state.user.role = action.payload.data[0]['Rola użytkownika']
                    state.user.department = action.payload.data[0]['Dział']
                }
            })
            .addCase(activateAccountAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(activateAccountAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    state.userIsLogged = true
                    state.message = 'Aktywacja konta przebiegła pomyślnie'
                    action.asyncDispatch(sendMessage('Aktywacja konta przebiegła pomyślnie'))
                } else {
                    state.message = action.payload.message
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
            .addCase(resetPasswordAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                if (action.payload.status === 'success') {
                    state.userIsLogged = true
                    state.message = 'Zmiana hasła przebiegła pomyślnie'
                    action.asyncDispatch(sendMessage('Zmiana hasła przebiegła pomyślnie'))
                } else {
                    state.message = action.payload.message
                    action.asyncDispatch(sendMessage(action.payload.message))
                }
            })
    },
})

export const { resetLoginMessage } = loginSlice.actions

export const selectUserIsLogged = (state) => state.login.userIsLogged
export const selectStatus = (state) => state.login.status
export const selectUser = (state) => state.login.user
export const selectMessage = (state) => state.login.message

export default loginSlice.reducer

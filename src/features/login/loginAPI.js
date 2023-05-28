import { API } from '../../api/API'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const userLogInAsync = createAsyncThunk(
  'login/fetchLogin',
  async (data) => {
    const response = await API.makePost('/api/users/login', data)
    return response
  }
)

export const userLogOutAsync = createAsyncThunk(
  'login/fetchLogout',
  async () => {
    const response = await API.makePost('/api/users/logout')
    return response
  }
)

export const userSignInAsync = createAsyncThunk(
  'login/fetchSignIn',
  async (data) => {
    const response = await API.makePost('/api/users/signup', data)
    return response
  }
)

export const userForgotPasswordAsync = createAsyncThunk(
  'login/fetchForgotPassword',
  async (data) => {
    const response = await API.makePost('/api/users/forgotpassword', data)
    return response
  }
)

export const userMeAsync = createAsyncThunk('login/fetchUserMe', async () => {
  const response = await API.makeGet('/api/users/me')
  return response
})

export const activateAccountAsync = createAsyncThunk(
  'login/fetchActivateAccount',
  async (data) => {
    const response = await API.makePost(`/api/users/activateaccount/${data}`)
    return response
  }
)

export const resetPasswordAsync = createAsyncThunk(
  'login/fetchResetPassword',
  async (data) => {
    const response = await API.makePost(`/api/users/resetpassword/${data}`)
    return response
  }
)

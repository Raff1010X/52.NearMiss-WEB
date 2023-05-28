import { API } from '../../api/API'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const userPatch = createAsyncThunk(
  'user/fetchPatchUser',
  async (data) => {
    const response = await API.makePatch('/api/users/me', data)
    return response
  }
)

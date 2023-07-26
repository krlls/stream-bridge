import { createSlice } from '@reduxjs/toolkit'

import { UserState } from './types.ts'
import { userApi } from './api.ts'
import { EStoreNames } from '../types.ts'

const initialState: UserState = {
  token: '',
  name: '',
}

export const userSlice = createSlice({
  name: EStoreNames.USER,
  initialState,
  reducers: {
    resetToken: (state) => {
      state.token = ''
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.auth.matchFulfilled, (state, action) => {
      state.token = action.payload
    })
  },
})

export default userSlice.reducer

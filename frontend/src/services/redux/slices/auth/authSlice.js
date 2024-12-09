import { createSlice } from '@reduxjs/toolkit'
import { loginUser, logoutUser, registerUser } from './authThunks'

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem('access_token'),
    token: localStorage.getItem('access_token') || null,
    error: null,
    status: 'idle'
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload.token
      localStorage.setItem('access_token', action.payload.token)
      state.error = null
      state.status = 'success'
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false
      state.error = action.payload
      state.status = 'failed'
    })


    .addCase(registerUser.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    .addCase(registerUser.fulfilled, (state) => {
      state.error = null
      state.status = 'success'
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload
      state.status = 'failed'
    })


    .addCase(logoutUser.pending, (state) => {
      state.status = 'loading'
      state.error = null
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false
      state.token = null
      state.status = 'success'
      localStorage.removeItem("access_token")
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.error = action.payload
      state.status = 'failed'
    })
  }
})

export default authSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import userReducer from './slices/user/userSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  }
})

export default store
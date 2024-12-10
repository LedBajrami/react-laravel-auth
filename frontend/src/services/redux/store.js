import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth/authSlice'
import userReducer from './slices/user/userSlice'
import postReducer from './slices/post/postSlice'
import commentsReducer from './slices/comments/commentsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    post: postReducer,
    comments: commentsReducer
  }
})

export default store
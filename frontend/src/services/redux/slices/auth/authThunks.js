import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../../helpers/apiClient";

export const loginUser = createAsyncThunk('/auth/loginUser', 
  async({email, password}, {rejectWithValue}) => {
    try {
      const response = await apiClient('/api/login', {
        method: 'POST',
        body: JSON.stringify({email, password})
      })
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Invalid email or password')
    }
  }
)

export const registerUser = createAsyncThunk('/auth/registerUser',
  async ({name, email, password, password_confirmation}, {rejectWithValue}) => {
    try {
      const response = await apiClient('/api/register', {
        method: "POST",
        body: JSON.stringify({name, email, password, password_confirmation})
      })
      return response
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed, please try again')
    }
  }
)

export const logoutUser = createAsyncThunk('/auth/logoutUser',
  async(_, {rejectWithValue}) => {
    try {
      const response = await apiClient('/api/logout', {method: "GET"})
      return response
    } catch (error) {
      return rejectWithValue(error.message || "There was an error while logging out")      
    }
  }
)
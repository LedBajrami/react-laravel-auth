import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../../helpers/apiClient";
import { updateProfilePhoto } from "./userSlice";


export const fetchUser = createAsyncThunk('user/fetchUser', 
  async (_, { rejectWithValue }) => {
      try {
          const response = await apiClient('/api/user', {
              method: "GET"
          })
          return response
      } catch (error) {
          return rejectWithValue(error.message || "Failed to fetch user data")``
      }
  }
)


export const uploadProfilePhoto = createAsyncThunk('user/uploadProfilePhoto', 
    async (file, {rejectWithValue, dispatch}) => {

        const formData = new FormData()
        formData.append('profile_photo', file)

        try {
            const response = await apiClient('/api/user/upload', {
                method: "POST",
                body: formData
            })
            dispatch(updateProfilePhoto(response.profile_photo))
            return response
        } catch (error) {
           return rejectWithValue(error.message || 'Photo upload failed, please try again')
        }
    }
)
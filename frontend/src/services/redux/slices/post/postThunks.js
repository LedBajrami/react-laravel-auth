
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../../helpers/apiClient";


export const getPosts = createAsyncThunk('post/getPosts', 
  async(_, {rejectWithValue}) => {
    try {
      const response = await apiClient('/api/posts', {
        method: 'GET'
      })
      return response
    } catch (error) {
      return rejectWithValue(error.message || "Could not fetch posts") 
    }
  }
)

export const uploadPost = createAsyncThunk('post/postUser',
  async(content, {rejectWithValue}) => {
    try {
      const response = await apiClient('/api/post', {
        method: 'POST',
        body: JSON.stringify(content)
      })
      return response
    } catch (error) {
      return rejectWithValue(error.message || "Could not post") 
    }
  }
)

export const deletePost = createAsyncThunk('post/deletePost', 
  async(id, { rejectWithValue }) => {
     try {
      await apiClient(`/api/posts/${id}`, {
        method: "DELETE"
      })
      return id
     } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete post');
     }
  }
)
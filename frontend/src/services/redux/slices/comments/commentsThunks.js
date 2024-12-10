import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../../../helpers/apiClient";



export const fetchPostWithComments = createAsyncThunk('comments/fetchPostWithComments',
   async (id, { rejectWithValue }) => {
  try {
    const response = await apiClient(`/api/posts/${id}`, { method: 'GET' })
    return response.post
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch post')
  }
});

export const addComment = createAsyncThunk('comments/addComment', 
  async({ postId, content }, { rejectWithValue }) => {
    try {
      const response = await apiClient(`/api/posts/${postId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content })
      })
      return response.comment
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add comment');
    }
  }
)

export const deleteComment = createAsyncThunk('comments/deleteComment',
  async ({ commentId }, { rejectWithValue }) => {
    try {
      await apiClient(`/api/comments/${commentId}`, { method: 'DELETE' })
      return { commentId }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete comment')
    }
  }
);
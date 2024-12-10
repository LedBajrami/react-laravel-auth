import { createSlice } from "@reduxjs/toolkit"
import { addComment, deleteComment, fetchPostWithComments } from "./commentsThunks";

const commentsSlice = createSlice({
  name: 'comments',
  initialState: { post: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostWithComments.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPostWithComments.fulfilled, (state, action) => {
        state.post = action.payload
        state.status = 'success'
      })
      .addCase(fetchPostWithComments.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.post.comments.push(action.payload) 
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        const { commentId } = action.payload
        state.post.comments = state.post.comments.filter((comment) => comment.id !== commentId)
      })
  },
});

export default commentsSlice.reducer
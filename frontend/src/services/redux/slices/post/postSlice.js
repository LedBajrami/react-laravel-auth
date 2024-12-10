import { createSlice } from "@reduxjs/toolkit";
import { deletePost, getPosts, uploadPost } from "./postThunks";

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getPosts.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    .addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload.posts
      state.status = 'success'
    })
    .addCase(getPosts.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })

    .addCase(uploadPost.pending, (state) => {
      state.error = null
      state.status = 'loading'
    })
    .addCase(uploadPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload.post)
      state.status = 'success'
    })
    .addCase(uploadPost.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })

    .addCase(deletePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id)
    })

  }
})

export default postSlice.reducer
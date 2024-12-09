import { createSlice } from "@reduxjs/toolkit"
import { fetchUser } from "./userThunks"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: "",
        email: "",
        profilePhoto: null,
        loading: false,
        error: null
    },
    reducers: {
        setUser(state, action) {
            state.name = action.payload.name
            state.email = action.payload.email
            state.profilePhoto = action.payload.profile_photo
        },
        updateProfilePhoto(state, action) {
            state.profilePhoto = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.name = action.payload.user.name
                state.email = action.payload.user.email
                state.profilePhoto = action.payload.user.profile_photo
                state.loading = false
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            
    }
})

export const { setUser, updateProfilePhoto } = userSlice.actions
export default userSlice.reducer
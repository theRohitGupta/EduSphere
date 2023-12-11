import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
    name : "User",
    initialState : {
        user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        loading : false,
    },
    reducers : {
        setUser(state, value) {
            state.user = value.payload
        },
        setLoading(state, value) {
            state.loading = value.payload
        }
    },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer; 
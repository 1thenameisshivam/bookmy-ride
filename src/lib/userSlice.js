import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,
        users: [],
    },
    reducers: {
        loggedin: (state, action) => {
            state.user = action.payload;
            console.log("Actions.payload is ",action);
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        },
        setUsers: (state, action) => {
            state.users = action.payload; // New reducer to set users
        },

        // isAdmin:(state)=>   
    },
});

export const { loggedin, logout,setUsers } = userSlice.actions;
export default userSlice.reducer;

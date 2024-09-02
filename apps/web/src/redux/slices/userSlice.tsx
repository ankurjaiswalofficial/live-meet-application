import { createSlice } from "@reduxjs/toolkit";

export interface UserSliceStates {
    name: string | null,
    email: string | null,
    imgSrc: string | null,
    userId: string | null,
}

const initialState: UserSliceStates = {
    name: null,
    email: null,
    imgSrc: null,
    userId: null,
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action: {payload : UserSliceStates}) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.imgSrc = action.payload.imgSrc
            state.userId = action.payload.userId
        }
    }
})

export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;

export default userSlice;

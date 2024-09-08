import { createSlice } from "@reduxjs/toolkit";
import { BaseUserDataInterface, UserDataInterface } from "@/types/user-types";


const initialState: BaseUserDataInterface = {
    username: "null",
    email: "null",
    imgSrc: null,
    peerId: "null",
    userData: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action: {payload : UserDataInterface}) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.imgSrc = action.payload.imgSrc
            state.peerId = action.payload.peerId
            state.userData = action.payload
        }
    }
})

export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;

export default userSlice;

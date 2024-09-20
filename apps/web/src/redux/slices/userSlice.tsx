import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUserDataInterface } from "@/types/user-types";
import { signOut } from "next-auth/react";

const initialState: BaseUserDataInterface = {
    username: "null",
    email: "null",
    imgSrc: null,
    peerId: "null",
    userData: null,
    status: false
};

// Fix the thunk to await the Prisma query and return the user data
const populateUserData = createAsyncThunk(
    "userSlice/populateUserData",
    async ({ email }: { email: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3000/api/routes/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });

            if (!response.ok) {
                return rejectWithValue(`Error: ${response.statusText}`);
            }

            const json = await response.json();
            const user = json.user;
            if (!user) {
                await signOut();
                return rejectWithValue("User not found");
            }

            return {
                peerId: user.peerId,
                username: user.name ?? String(user.email).split("@")[0],
                email: user.email,
                imgSrc: user.image,
                userData: {
                    username: user.name ?? String(user.email).split("@")[0],
                    email: user.email,
                    imgSrc: user.image,
                    peerId: user.peerId,
                },
                status: true,
            };
        } catch (error: any) {
            console.error("Error finding user:", error.message);
            return rejectWithValue("Error finding user");
        }
    }
);


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(populateUserData.fulfilled, (state, action) => {
                if (action.payload) {
                    state.peerId = action.payload.peerId;
                    state.username = action.payload.username;
                    state.email = action.payload.email;
                    state.imgSrc = action.payload.imgSrc;
                    state.userData = action.payload.userData;
                    state.status = action.payload.status;
                }
            })
            .addCase(populateUserData.rejected, (state, action) => {
                state.status = false;
                console.log(action.payload); // Log the error message
            });
    }
});

export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
export { populateUserData };
export default userSlice;

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

//TODO: Handle for the automatic or user defined triggering of the states as fullscreen and exit fullscreen.

export const toggleFullscreen = createAsyncThunk(
    'fullscreen/toggleFullscreen',
    async (_, {getState}) => {
        const state = getState() as { fullScreen: { isFullscreen: boolean } };
        const documentElement = document.documentElement;
        console.log("Came to fullscreen", state);
        if (!state.fullScreen.isFullscreen) {
            console.log("Came to fullscreen in if", state);
            try {
                if (documentElement.requestFullscreen) {
                    await documentElement.requestFullscreen();
                    return true;
                }
            } catch (error) {
                console.error("Error requesting fullscreen:", error);
                return false;
            }
        } else {
            try {
                await document.exitFullscreen();
                return false;
            } catch (error) {
                console.error("Error exiting fullscreen:", error);
                return state.fullScreen.isFullscreen;
            }
        }
    }
);

const fullScreenSlice = createSlice({
    name: "fullscreen",
    initialState: {
        isFullscreen: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleFullscreen.fulfilled, (state, action) => {
            state.isFullscreen = action.payload ?? false;
        })
    },
})


export const fullScreenReducer = fullScreenSlice.reducer;
export const fullScreenActions = fullScreenSlice.actions;

export default fullScreenSlice;

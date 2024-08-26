import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const toggleFullscreen = createAsyncThunk(
    'fullscreen/toggleFullscreen',
    async (_, { getState }) => {
        const state = getState() as { fullscreen: { isFullscreen: boolean } };
        const documentElement = document.documentElement;

        if (!state.fullscreen.isFullscreen) {
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
                return state.fullscreen.isFullscreen;
            }
        }
    }
);

const fullScreenSlice = createSlice({
    name: "fullscreen",
    initialState: {
        isFullscreen: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(toggleFullscreen.fulfilled, (state, action) => {
            state.isFullscreen = action.payload ?? false;
        })
    },
})


export const fullScreenReducer = fullScreenSlice.reducer;
export const fullScreenActions = fullScreenSlice.actions;

export default fullScreenSlice;

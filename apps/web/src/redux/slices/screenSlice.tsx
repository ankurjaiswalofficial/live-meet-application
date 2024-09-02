import {RefObject} from "react";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ScreenState {
    isActive: boolean;
    isRecording: boolean;
    screenUrl: string | null;
    screenBlob: Blob | null;
}

const initialState: ScreenState = {
    isActive: false,
    isRecording: false,
    screenUrl: null,
    screenBlob: null,
};

const toggleScreen = createAsyncThunk(
    "screenSlice/toggleScreen",
    async (screenRef: RefObject<HTMLVideoElement> | null, {getState}) => {
        const state = getState() as { screenHandler: { isActive: boolean, } };
        console.log("Triggered toggleScreen() func and screenref is", screenRef, getState());

        if (state.screenHandler.isActive) {
            console.log("inside active screen");
            if (screenRef?.current && screenRef?.current.srcObject) {
                const screenStream = screenRef?.current.srcObject as MediaStream;
                const screenTracks = screenStream.getTracks();
                screenTracks.forEach((track) => track.stop());
                return false;
            }
        } else {
            console.log("inside inactive screen");
            try {
                const displayMediaOptions: DisplayMediaStreamOptions = {
                    // video: {
                    //     displaySurface: "browser",
                    // },
                    // audio: true,
                    // preferCurrentTab: false,
                    // selfBrowserSurface: "exclude",
                    // systemAudio: "include",
                    // surfaceSwitching: "include",
                    // monitorTypeSurfaces: "include",
                };
                const mediaStream = await navigator.mediaDevices.getUserMedia(displayMediaOptions);
                if (screenRef?.current) {
                    screenRef.current.srcObject = mediaStream;
                    await screenRef.current.play();
                    return true;
                }
            } catch (error) {
                console.error("Error accessing screen media device:", error);
            }
        }
        return false;
    }
);

const screenSlice = createSlice({
    name: "screenSlice",
    initialState,
    reducers: {
        handleActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        },
        playScreen: (state) => {
            state.isActive = true;
        },
        stopScreen: (state) => {
            state.isActive = false;
        },
        startRecording: (state) => {
            state.isRecording = true;
        },
        stopRecording: (state, action: PayloadAction<Blob>) => {
            state.isRecording = false;
            state.screenBlob = action.payload;
            state.screenUrl = URL.createObjectURL(action.payload);
        },
        resetScreen: (state) => {
            state.isActive = false;
            state.isRecording = false;
            state.screenUrl = null;
            state.screenBlob = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(toggleScreen.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        });
    },
});

export {toggleScreen};
export const screenSliceReducer = screenSlice.reducer;
export const screenSliceActions = screenSlice.actions;

export default screenSlice;

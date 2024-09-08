import {RefObject} from "react";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { MediaStateInterface } from "@/types/media-types";

const initialState: MediaStateInterface = {
    isActive: false,
    isRecording: false,
    url: null,
    blob: null,
};

const toggleScreen = createAsyncThunk(
    "screenSlice/toggleScreen",
    async (screenRef: RefObject<HTMLVideoElement> | null, {getState}) => {
        const state = getState() as { screenHandler: { isActive: boolean, } };
        console.log("Triggered toggleScreen() func and screenref is", screenRef, getState());

        if (state.screenHandler.isActive) {
            if (screenRef?.current && screenRef?.current.srcObject) {
                const screenStream = screenRef?.current.srcObject as MediaStream;
                const screenTracks = screenStream.getTracks();
                screenTracks.forEach((track) => track.stop());
                return false;
            }
        } else {
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
            state.blob = action.payload;
            state.url = URL.createObjectURL(action.payload);
        },
        resetScreen: (state) => {
            state.isActive = false;
            state.isRecording = false;
            state.url = null;
            state.blob = null;
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

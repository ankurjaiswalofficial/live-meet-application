import {RefObject} from "react";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AudioState {
    isActive: boolean;
    isRecording: boolean;
    videoUrl: string | null;
    videoBlob: Blob | null;
}

const initialState: AudioState = {
    isActive: false,
    isRecording: false,
    videoUrl: null,
    videoBlob: null,
};

const toggleVideo = createAsyncThunk(
    "videoSlice/toggleVideo",
    async (videoRef: RefObject<HTMLVideoElement> | null, {getState}) => {
        const state = getState() as { videoHandler: { isActive: boolean, } };
        console.log("Triggered toggleVideo() func and videoref is", videoRef, getState());

        if (state.videoHandler.isActive) {
            console.log("inside active video");
            if (videoRef?.current && videoRef?.current.srcObject) {
                const videoStream = videoRef?.current.srcObject as MediaStream;
                const videoTracks = videoStream.getTracks();
                videoTracks.forEach((track) => track.stop());
                return false;
            }
        } else {
            console.log("inside inactive video");
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (videoRef?.current) {
                    videoRef.current.srcObject = mediaStream;
                    await videoRef.current.play();
                    return true;
                }
            } catch (error) {
                console.error("Error accessing video media device:", error);
            }
        }
        return false;
    }
);

const videoSlice = createSlice({
    name: "videoSlice",
    initialState,
    reducers: {
        handleActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        },
        playVideo: (state) => {
            state.isActive = true;
        },
        stopVideo: (state) => {
            state.isActive = false;
        },
        startRecording: (state) => {
            state.isRecording = true;
        },
        stopRecording: (state, action: PayloadAction<Blob>) => {
            state.isRecording = false;
            state.videoBlob = action.payload;
            state.videoUrl = URL.createObjectURL(action.payload);
        },
        resetVideo: (state) => {
            state.isActive = false;
            state.isRecording = false;
            state.videoUrl = null;
            state.videoBlob = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(toggleVideo.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        });
    },
});

export {toggleVideo};
export const videoSliceReducer = videoSlice.reducer;
export const videoSliceActions = videoSlice.actions;

export default videoSlice;

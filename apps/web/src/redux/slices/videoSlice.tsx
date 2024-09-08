import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { MediaStateInterface, VideoContextType } from "@/types/media-types";

const initialState: MediaStateInterface = {
    isActive: false,
    isRecording: false,
    url: null,
    blob: null,
};

const toggleVideo = createAsyncThunk(
    "videoSlice/toggleVideo",
    async ({videoStream, setVideoStream}: VideoContextType, {getState}) => {
        const state = getState() as { videoHandler: { isActive: boolean, } };

        if (state.videoHandler.isActive) {
            if (videoStream) {
                const videoTracks = videoStream.getTracks();
                videoTracks.forEach((track) => track.stop());
                setVideoStream(null);
                return false;
            }
        } else {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                setVideoStream(mediaStream);
                return true;
            } catch (error) {
                console.error("Error accessing video media device:", error);
            }
        }
        setVideoStream(null);
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
            state.blob = action.payload;
            state.url = URL.createObjectURL(action.payload);
        },
        resetVideo: (state) => {
            state.isActive = false;
            state.isRecording = false;
            state.url = null;
            state.blob = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(toggleVideo.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload
        });
    },
});

export {toggleVideo};
export const videoSliceReducer = videoSlice.reducer;
export const videoSliceActions = videoSlice.actions;

export default videoSlice;

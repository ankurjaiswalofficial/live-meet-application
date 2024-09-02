import { RefObject } from "react";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioContextType } from "@/context/audioContext";

interface AudioState {
    isActive: boolean;
    isRecording: boolean;
    audioUrl: string | null;
    audioBlob: Blob | null;
}

const initialState: AudioState = {
    isActive: false,
    isRecording: false,
    audioUrl: null,
    audioBlob: null,
};

const toggleAudio = createAsyncThunk(
    "audioSlice/toggleAudio",
    async ({ audioStream, setAudioStream }: AudioContextType, { getState }) => {
        const state = getState() as { audioHandler: { isActive: boolean, } };
        console.log("Triggered toggleAudio() func and audioref is", audioStream, getState());

        if (state.audioHandler.isActive) {
            console.log("inside active audio");
            if (audioStream) {
                const audioTracks = audioStream.getTracks();
                audioTracks.forEach((track) => track.stop());
                setAudioStream(null);
                return false;
            }
        } else {
            console.log("inside inactive audio");
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                setAudioStream(mediaStream);
                return true;

            } catch (error) {
                console.error("Error accessing audio media device:", error);
            }
        }
        setAudioStream(null);
        return false;
    }
);

const audioSlice = createSlice({
    name: "audioSlice",
    initialState,
    reducers: {
        handleActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        },
        playAudio: (state) => {
            state.isActive = true;
        },
        stopAudio: (state) => {
            state.isActive = false;
        },
        startRecording: (state) => {
            state.isRecording = true;
        },
        stopRecording: (state, action: PayloadAction<Blob>) => {
            state.isRecording = false;
            state.audioBlob = action.payload;
            state.audioUrl = URL.createObjectURL(action.payload);
        },
        resetAudio: (state) => {
            state.isActive = false;
            state.isRecording = false;
            state.audioUrl = null;
            state.audioBlob = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(toggleAudio.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload;
        });
    },
});

export { toggleAudio };
export const audioSliceReducer = audioSlice.reducer;
export const audioSliceActions = audioSlice.actions;

export default audioSlice;

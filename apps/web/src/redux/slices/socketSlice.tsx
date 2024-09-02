import { generateCustomUUID } from "@/lib/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserSliceStates } from "./userSlice";
import { MutableRefObject, } from "react";

interface SocketSliceStates {
    isConnected: boolean,
    meetId: string | null,
    host: UserSliceStates | null,
}

const initialState: SocketSliceStates = {
    isConnected: false,
    meetId: null,
    host: null,
}

const generateInstantMeet = createAsyncThunk(
    "socketSlice/generateInstantMeet",
    async ({ wsRef, peerConnectionRef }: { wsRef: MutableRefObject<WebSocket | null>, peerConnectionRef: MutableRefObject<RTCPeerConnection | null> }, { getState, dispatch }) => {
        const state = getState() as { socketHandler: SocketSliceStates, userHandler: UserSliceStates };
        if (wsRef?.current) {
            dispatch(socketSliceActions.generateMeetId());
            dispatch(socketSliceActions.setHost(state.userHandler));
            dispatch(socketSliceActions.setIsConnected(true));
        }
    }
)

const startWebRTC = createAsyncThunk(
    "socketSlice/startWebRTC",
    async ({ wsRef, peerConnectionRef }: { wsRef: MutableRefObject<WebSocket | null>, peerConnectionRef: MutableRefObject<RTCPeerConnection | null> }, { getState, dispatch }) => {
        const state = getState() as { socketHandler: SocketSliceStates, userHandler: UserSliceStates };
        peerConnectionRef.current = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302"
                }
            ]
        })
        peerConnectionRef.current.onicecandidate = (event) => {
            if (event.candidate) {
                wsRef.current?.send(JSON.stringify({ type: 'signal', meetId: state.socketHandler.meetId, signal: event.candidate }));
            }
        }
        peerConnectionRef.current.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };
    }
)

const handleIceCandidate = createAsyncThunk(
    "socketSlice/handleIceCandidate",
    async ({ socket, event }: { socket: WebSocket, event: RTCPeerConnectionIceEvent }, { getState, dispatch }) => {
        if (event.candidate) {
            socket.send(JSON.stringify({ type: 'iceCandidate', candidate: event.candidate }));
        }
    }
)

const handleOfferReceived = createAsyncThunk(
    "socketSlice/handleOfferReceived",
    async ({ socket, event }: { socket: WebSocket, event: RTCPeerConnectionIceEvent }, { getState, dispatch }) => {
        if (event.candidate) {
            socket.send(JSON.stringify({ type: 'iceCandidate', candidate: event.candidate }));
        }
    }
)

const createMeetRoom = createAsyncThunk(
    "socketSlice/createMeetRoom",
    async ({ wsRef }: { wsRef: MutableRefObject<WebSocket | null> }) => {
        wsRef?.current?.send(JSON.stringify({ type: "create-meet-room" }))
    }
)

const joinMeetRoom = createAsyncThunk(
    "socketSlice/joinMeetRoom",
    async ({ wsRef }: { wsRef: MutableRefObject<WebSocket | null> }, { getState }) => {
        const state = getState() as { socketHandler: SocketSliceStates };
        wsRef?.current?.send(JSON.stringify({ type: "join-meet-room", meetId: state.socketHandler.meetId }))
    }
)


const socketSlice = createSlice({
    name: "socketSlice",
    initialState,
    reducers: {
        setIsConnected: (state, action) => {
            state.isConnected = action.payload;
        },
        generateMeetId: (state) => {
            state.meetId = generateCustomUUID();
        },
        setHost: (state, action) => {
            state.host = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(generateInstantMeet.fulfilled, (state, action) => {
            console.log("generated instant meet", state.meetId, state.isConnected, state.host);
        })

    }
})

export { generateInstantMeet };

export const socketSliceActions = socketSlice.actions;
export const socketSliceReducer = socketSlice.reducer;

export default socketSlice;


"use client";
import React, {
    createContext,
    MutableRefObject,
    ReactNode,
    useRef,
    useMemo,
    useContext,
    useState,
    useEffect,
} from "react";
import { VideoContext } from "./videoContext";
import { AudioContext } from "./audioContext";
import { ScreenContext } from "./screenContext";
import { UserData } from "@/app/meet/components/ContactCard/ContactCard";
import { UserContext } from "./userContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { toggleAudio } from "@/redux/slices/audioSlice";
import { toggleVideo } from "@/redux/slices/videoSlice";

interface SocketStream {
    peerId: string;
    userData: UserData;
    meetId: string;
    audioStream?: MediaStream | null;
    videoStream?: MediaStream | null;
    audioActive?: boolean;
    videoActive?: boolean;
    // screenAudioStream?: MediaStream | null;
    // screenVideoStream?: MediaStream | null;
    // screenAudioActive?: boolean;
    // screenVideoActive?: boolean;
};

interface SocketContextType {
    localStream: SocketStream;
    remoteStream: SocketStream[];
    wsRef: MutableRefObject<WebSocket | null>;
    pcRef: MutableRefObject<RTCPeerConnection | null>;
};

const SocketContext = createContext<SocketContextType | null>(null);

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const userData = useContext(UserContext);
    const [peerId, setPeerId] = useState<string | null>(null);
    const meetId = "wer-453-rtg";
    const audioContext = useContext(AudioContext);
    const videoContext = useContext(VideoContext);
    const audioActive = useSelector((state: RootState) => state.audioHandler.isActive);
    const videoActive = useSelector((state: RootState) => state.videoHandler.isActive);
    const [localStream, setLocalStream] = useState<SocketStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<SocketStream[]>([]);
    const dispatch = useAppDispatch();

    useEffect(
        () => {
            setPeerId(userData?.userId ?? null);
        }, [userData]
    )


    useEffect(
        () => {
            if (peerId && userData) {
                setLocalStream({
                    peerId: peerId,
                    userData: userData,
                    meetId: meetId,
                    audioActive: audioActive,
                    videoActive: videoActive,
                    audioStream: audioContext?.audioStream,
                    videoStream: videoContext?.videoStream,
                })
            }
        },
        [peerId, userData, audioActive, audioContext?.audioStream, videoActive, videoContext?.videoStream]
    )


    const wsRef = useRef<WebSocket | null>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);


    const contextValue = useMemo(
        () => (localStream
            && {
            localStream,
            remoteStream,
            wsRef,
            pcRef,
        }
        ), [localStream, remoteStream, wsRef, pcRef]
    );

    useEffect(
        () => console.log(contextValue),
        [contextValue]
    )
    if (!peerId) return;
    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketContextProvider };

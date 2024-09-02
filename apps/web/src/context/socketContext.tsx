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
    useCallback,
} from "react";
import { VideoContext } from "./videoContext";
import { AudioContext } from "./audioContext";
import { ScreenContext } from "./screenContext";

type SocketStream = {
    audio: MediaStream | null | undefined;
    video: MediaStream | null | undefined;
    display: MediaStream | null | undefined;
};

type SocketContextType = {
    localStream: SocketStream;
    remoteStream: SocketStream[];
    wsRef: MutableRefObject<WebSocket | null>;
    peerConnectionRef: MutableRefObject<RTCPeerConnection | null>;
};

const SocketContext = createContext<SocketContextType | null>(null);

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const audioRef = useContext(AudioContext);
    const videoRef = useContext(VideoContext);
    const screenRef = useContext(ScreenContext);

    const [localStream, setLocalStream] = useState<SocketStream>({
        audio: null,
        video: null,
        display: null,
    });

    const [remoteStream, setRemoteStream] = useState<Array<SocketStream>>([]);
    const wsRef = useRef<WebSocket | null>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

    const startMediaCapture = useCallback(() => {
        console.log("Starting media capture...");

        const newLocalStream: SocketStream = {
            audio: audioRef?.current?.srcObject as MediaStream,
            video: videoRef?.current?.srcObject as MediaStream,
            display: screenRef?.current?.srcObject as MediaStream,
        };

        console.log("New local stream", newLocalStream);

        setLocalStream(newLocalStream);
    }, [
        audioRef?.current?.srcObject,
        videoRef?.current?.srcObject,
        screenRef?.current?.srcObject,
    ]);

    const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate && wsRef.current) {
            wsRef.current.send(
                JSON.stringify({
                    type: "iceCandidate",
                    candidate: event.candidate,
                })
            );
        }
    };

    const handleOfferReceived = async (offer: RTCSessionDescriptionInit) => {
        if (!peerConnectionRef.current) return;
        await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(offer)
        );
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        wsRef.current?.send(JSON.stringify({ type: "answer", answer }));
    };

    const handleAnswerReceived = async (answer: RTCSessionDescriptionInit) => {
        if (!peerConnectionRef.current) return;
        await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(answer)
        );
    };

    const handleDataChannelMessage = (event: MessageEvent) => {
        console.log("Received message:", event.data);
    };

    const handleConnectionStateChanged = (event: Event) => {
        if (
            (event.target as RTCPeerConnection).iceConnectionState ===
            "connected"
        ) {
            console.log("Connection State Changed");
        }
    };

    const handleError = (error: any) => {
        console.error("Error:", error);
    };

    const initPeerConnection = () => {
        const configuration: RTCConfiguration = {
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        };

        const newPeerConnection = new RTCPeerConnection(configuration);
        console.log("Peer Initialized");

        newPeerConnection.onicecandidate = handleIceCandidate;
        newPeerConnection.ontrack = (event: RTCTrackEvent) => {
            const [stream] = event.streams;

            const audioStream = new MediaStream();
            const videoStream = new MediaStream();

            stream
                .getAudioTracks()
                .forEach((track) => audioStream.addTrack(track));
            stream
                .getVideoTracks()
                .forEach((track) => videoStream.addTrack(track));

            setRemoteStream((prevStreams) => [
                ...prevStreams,
                {
                    audio: audioStream,
                    video: videoStream,
                    display: null,
                },
            ]);
        };
        newPeerConnection.onnegotiationneeded = async () => {
            try {
                const offer = await newPeerConnection.createOffer();
                await newPeerConnection.setLocalDescription(offer);
                wsRef.current?.send(JSON.stringify({ type: "offer", offer }));
            } catch (error) {
                handleError(error);
            }
        };
        newPeerConnection.onsignalingstatechange = handleConnectionStateChanged;
        newPeerConnection.oniceconnectionstatechange =
            handleConnectionStateChanged;
        newPeerConnection.ondatachannel = (event: RTCDataChannelEvent) => {
            const dataChannel = event.channel;
            dataChannel.onmessage = handleDataChannelMessage;
        };

        peerConnectionRef.current = newPeerConnection;
        console.log("Peer Connection Init Success", newPeerConnection);
    };

    useEffect(() => {
        if (localStream.audio || localStream.video || localStream.display) {
            console.log("Local stream has been updated:", localStream);
        }
    }, [localStream]);

    const handleCallBtn = () => {
        if (!peerConnectionRef.current) {
            handleError("Peer connection not initialized yet!");
            return;
        }
        startMediaCapture();
        if (localStream.video) {
            try {
                localStream.video
                    .getTracks()
                    .forEach((track: MediaStreamTrack) => {
                        peerConnectionRef.current?.addTrack(
                            track,
                            localStream.video as MediaStream
                        );
                        console.log("Video tracks added to peer connection.");
                    });
            } catch (e: any) {
                handleError(e);
            }
        } else {
            handleError("No video stream available.");
        }

        if (localStream.audio) {
            try {
                localStream.audio
                    .getTracks()
                    .forEach((track: MediaStreamTrack) => {
                        peerConnectionRef.current?.addTrack(
                            track,
                            localStream.audio as MediaStream
                        );
                    });
                console.log("Audio tracks added to peer connection.");
            } catch (e: any) {
                handleError(e);
            }
        } else {
            handleError("No audio stream available.");
        }

        if (localStream.display) {
            try {
                localStream.display
                    .getTracks()
                    .forEach((track: MediaStreamTrack) => {
                        peerConnectionRef.current?.addTrack(
                            track,
                            localStream.display as MediaStream
                        );
                    });
                console.log("Display tracks added to peer connection.");
            } catch (e: any) {
                handleError(e);
            }
        } else {
            handleError("No display stream available.");
        }
    };

    useEffect(() => {
        startMediaCapture();
    }, [startMediaCapture]);

    useEffect(() => {
        wsRef.current = new WebSocket("ws://localhost:8080");
        console.log("WebSocket Connected");
        wsRef.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case "offer":
                    handleOfferReceived(message.offer);
                    break;
                case "answer":
                    handleAnswerReceived(message.answer);
                    break;
                case "iceCandidate":
                    peerConnectionRef.current?.addIceCandidate(
                        new RTCIceCandidate(message.candidate)
                    );
                    break;
            }
        };
    }, []);

    useEffect(() => {
        startMediaCapture();
        initPeerConnection();
    }, []);

    useEffect(() => {
        if (remoteStream.length > 0) {
            console.log("Remote Stream", remoteStream);
            // remoteVideo.current.srcObject = remoteStream[0].video; // Example to handle remote video stream
        }
    }, [remoteStream]);

    const contextValue = useMemo(
        () => ({
            localStream,
            remoteStream,
            wsRef,
            peerConnectionRef,
        }),
        [localStream, remoteStream, wsRef, peerConnectionRef]
    );

    return (
        <SocketContext.Provider value={contextValue}>
            <button onClick={handleCallBtn}>Call Button</button>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketContextProvider };

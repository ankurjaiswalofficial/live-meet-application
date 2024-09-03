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
import { UserData } from "@/app/meet/components/ContactCard/ContactCard";
import { UserContext } from "./userContext";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { RemoteContext } from "./remoteContext";
import { RemoteDataProps } from "@/app/meet/components/ContactCard/RemoteCard";

interface SocketIdentificationType {
    peerId: string;
    userData: UserData;
    meetId: string;
    audioActive?: boolean;
    videoActive?: boolean;
    // screenAudioActive?: boolean;
    // screenVideoActive?: boolean;
}

interface SocketStream extends SocketIdentificationType {
    audioStream?: MediaStream | null;
    videoStream?: MediaStream | null;
    // screenAudioStream?: MediaStream | null;
    // screenVideoStream?: MediaStream | null;
};

interface SocketContextType {
    localStream: SocketStream;
    remoteStream: { [key: string]: SocketStream };
    wsRef: MutableRefObject<WebSocket | null>;
    pcRef: MutableRefObject<{ [key: string]: RTCPeerConnection } | null>;
};

const SocketContext = createContext<SocketContextType | null>(null);

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const userData = useContext(UserContext);
    const meetId = "wer-453-rtg";
    const audioContext = useContext(AudioContext);
    const videoContext = useContext(VideoContext);
    const remoteContext = useContext(RemoteContext);
    const audioActive = useSelector((state: RootState) => state.audioHandler.isActive);
    const videoActive = useSelector((state: RootState) => state.videoHandler.isActive);
    const [localStream, setLocalStream] = useState<SocketStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<RemoteDataProps[]>([]);

    const wsRef = useRef<WebSocket | null>(null);
    const pcRef = useRef<{ [key: string]: RTCPeerConnection }>({});


    useEffect(
        () => {
            console.log(remoteStream);
            remoteContext.forEach((peerData) => {
                remoteContext.pop();
            })
            Object.keys(remoteStream).forEach((peerId:string) => {
                if(peerId in Object.keys(pcRef.current)){
                    remoteContext.push(remoteStream[peerId]);
                }
            })
        }, [remoteStream]
    )


    useEffect(
        () => {
            wsRef.current = new WebSocket("ws://localhost:8080");
            wsRef.current.onmessage = (event: MessageEvent) => { handleSocket(event) };
            wsRef.current.onopen = () => {
                console.log("WebSocket connection opened");
                if (userData) {
                    const _userData = {
                        peerId: userData.userId,
                        userData: userData,
                        meetId: meetId,
                        audioActive: audioActive,
                        videoActive: videoActive,
                    }
                    wsRef.current?.send(
                        JSON.stringify({ type: "new-peer", peerData: _userData })
                    );
                }
            };
        }, []
    )

    const handleSocket = (event: MessageEvent) => {
        let msg: {
            candidate: RTCSessionDescriptionInit;
            answer: RTCSessionDescriptionInit;
            type: string;
            peerData: SocketIdentificationType;
            offer: RTCSessionDescriptionInit;
        },
            peerId: string,
            pc: RTCPeerConnection;

        try {
            msg = JSON.parse(event.data);
        } catch (error) {
            console.log("Invalid MessageEvent from Socket Server");
            return;
        }
        console.log(msg);
        peerId = msg.peerData.peerId;
        if (!pcRef.current[peerId]) { pc = createNewPeerCon(msg.peerData) }

        pc = pcRef?.current[peerId];

        switch (msg.type) {
            case "new-peer":
                console.log("New peer joined:", peerId);
                // && peerId !== userData.userId
                if (userData) {
                    const _userData = {
                        peerId: userData.userId,
                        userData: userData,
                        meetId: meetId,
                        audioActive: audioActive,
                        videoActive: videoActive,
                    }
                    createOffer(pc, _userData);
                }
                break;
            case "offer":
                pc.setRemoteDescription(new RTCSessionDescription(msg.offer)).then(() => {
                    pc.createAnswer().then((answer: RTCSessionDescriptionInit) => {
                        pc.setLocalDescription(answer).then(() => {
                            if (wsRef.current) {
                                wsRef.current.send(JSON.stringify({
                                    type: "answer",
                                    answer: answer,
                                    peerData: msg.peerData,
                                }))
                                console.log("Success ALD of ", peerId);
                            }
                            console.log("Failed ALD due to ws not connected of", peerId);
                        }).catch((error) => {
                            console.log("Failed ALD of ", peerId);
                        })
                    }).catch((error) => {
                        console.log("Failed CA of ", peerId);
                    })
                    console.log("Success ORD of ", peerId);
                }).catch((error) => {
                    console.log("Failed ORD of", peerId);
                })
                break;
            case "answer":
                pc.setRemoteDescription(new RTCSessionDescription(msg.answer)).then(() => {
                    console.log("Success ARD of ", peerId);
                }).catch((error) => {
                    console.log("Failed ARD of ", peerId);
                })
                break;
            case "ice-candidate":
                pc.setRemoteDescription(new RTCSessionDescription(msg.candidate)).then(() => {
                    console.log("Success ICRD of ", peerId);
                }).catch((error) => {
                    console.log("Failed ICRD of ", peerId);
                })
                break;
            case "error":
                console.error("WS Error", msg)
                break;
            default:
                console.log("Unknown Data", msg)
                break;
        }

    }

    const createNewPeerCon = (userData: SocketIdentificationType) => {
        const configuration: RTCConfiguration = {
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
            ]
        }
        const pc = new RTCPeerConnection(configuration);

        handleStreamOfferCall();

        pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
            if (event.candidate && wsRef.current) {
                wsRef.current?.send(JSON.stringify({
                    type: "ice-candidate",
                    candidate: event.candidate,
                    peerData: userData,
                }))
            }
        }

        pc.onnegotiationneeded = (event: Event) => {
            createOffer(pc, userData);
        }

        pc.onconnectionstatechange = (event: Event) => {
            if (pc.connectionState === "connected") {
                console.log("PC is CSC")
            } else {
                console.log("PC is not CSC", pc.connectionState);
            }
        }

        pc.oniceconnectionstatechange = () => {
            console.log(
                "ICE connection state changed:",
                pc.iceConnectionState
            );
            if (pc.iceConnectionState === "failed") {
                pc.restartIce();
            } else if (pc.iceConnectionState === "connected") {
                console.log("Connected");
            }
        };

        pc.ontrack = (event: RTCTrackEvent) => {
            const streams = event.streams[0]
            const newObject: RemoteDataProps = {
                // peerId: "",
                // meetId: "",
                userData: {
                    username: "",
                    email: "",
                    userId: ""
                },
                audioActive: false,
                videoActive: false,
                audioStream: null,
                videoStream: null,
            };
            // newObject.peerId = userData.peerId
            // newObject.meetId = userData.meetId
            newObject.userData = userData.userData
            newObject.audioActive = userData.audioActive ?? false
            newObject.videoActive = userData.videoActive ?? false

            try {
                const _audioStream = new MediaStream();
                streams.getAudioTracks().forEach((track) => _audioStream.addTrack(track));
                newObject.audioStream = _audioStream;
            }
            catch (error) {
                console.log("Remote AS Not Comming")
            }
            try {
                const _videoStream = new MediaStream();
                streams.getVideoTracks().forEach((track) => _videoStream.addTrack(track));
                newObject.videoStream = _videoStream;
            }
            catch (error) {
                console.log("Remote VS Not Comming")

            }
            setRemoteStream(prev => ({
                ...prev,
                [userData.peerId]: newObject
            }
            ));
        }

        pcRef.current[userData.peerId] = pc;
        return pc;
    }

    const createOffer = (pc: RTCPeerConnection, userData: SocketIdentificationType) => {
        console.log("Creating Offer");
        pc.createOffer().then((offer) => {
            pc.setLocalDescription(new RTCSessionDescription(offer)).then(() => {
                if (wsRef.current) {
                    wsRef.current.send(JSON.stringify({
                        type: "offer",
                        offer: offer,
                        peerData: userData,
                    }))
                }
            })
        })
    }


    const handleStreamOfferCall = () => {
        if (audioActive || videoActive) {
            const _localStream = new MediaStream();
            console.log(localStream)
            if (audioContext?.audioStream) {
                audioContext.audioStream.getTracks().forEach((track) => { _localStream.addTrack(track) })
            }
            if (videoContext?.videoStream) {
                videoContext.videoStream.getTracks().forEach((track) => { _localStream.addTrack(track) })
            }

            // setLocalStream(prev => ({
            //     ...prev,
            //     audioStream: audioContext.audioStream,
            //     videoStream: videoContext.videoStream
            // }));

            console.log(_localStream);
            _localStream.getTracks().forEach((track) => {
                Object.entries(pcRef.current).forEach(([key, pc]) => {
                    pc.addTrack(track, _localStream)
                    if (userData) {
                        const _userData = {
                            peerId: userData.userId,
                            userData: userData,
                            meetId: meetId,
                            audioActive: audioActive,
                            videoActive: videoActive,
                        }
                        createOffer(pc, _userData)
                    }
                })
            })
        }
    }

    const startMediaMonitor = () => {
        if (userData) {
            setLocalStream({
                peerId: userData.userId,
                userData: userData,
                meetId: meetId,
                audioActive: audioActive,
                videoActive: videoActive,
                audioStream: audioContext?.audioStream,
                videoStream: videoContext?.videoStream,
            })
        }
    }


    // const startConMonitor = useCallback(
    //     () => {
    //         if (localStream) {
    //             createNewPeerCon(localStream)
    //         }
    //     }, [audioContext?.audioStream, videoContext?.videoStream]
    // )

    function removePeerConnection(remotePeerId: string) {
        const pc = pcRef.current[remotePeerId];
        if (pc) {
            pc.close();
            delete pcRef.current[remotePeerId];
        }
    }

    useEffect(() => {
        if (localStream) {
            createNewPeerCon(localStream)
        }
        startMediaMonitor();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
            Object.keys(pcRef.current).forEach(
                removePeerConnection
            );
        };
    }, []);

    useEffect(() => {
        handleStreamOfferCall();
        console.log("called handleStreamOfferCall", localStream, audioContext?.audioStream, videoContext?.videoStream)
    }, [audioActive, videoActive]
    )

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
    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketContextProvider };

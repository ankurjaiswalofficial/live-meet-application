"use client";

import React, { useRef, useState, useEffect } from "react";

const VideoCall: React.FC = () => {
    const localVideo = useRef<HTMLVideoElement | null>(null);
    const remoteVideo = useRef<HTMLVideoElement | null>(null);
    const callButton = useRef<HTMLButtonElement | null>(null);

    const [socket] = useState(() => new WebSocket("ws://localhost:8080"));
    const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const startVideo = async () => {
        try {
            const stream: MediaStream =
                await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
            setLocalStream(stream);
            if (localVideo.current) {
                localVideo.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    };

    const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
            socket.send(
                JSON.stringify({
                    type: "iceCandidate",
                    candidate: event.candidate,
                })
            );
        }
    };

    const handleOfferReceived = async (offer: RTCSessionDescriptionInit) => {
        if (!peerConnection) return;
        await peerConnection.setRemoteDescription(
            new RTCSessionDescription(offer)
        );
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.send(JSON.stringify({ type: "answer", answer }));
    };

    const handleAnswerReceived = async (answer: RTCSessionDescriptionInit) => {
        if (!peerConnection) return;
        await peerConnection.setRemoteDescription(
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
            console.log("Connection established");
        }
    };

    const handleError = (error: Error) => {
        console.error("Error:", error);
    };

    const initPeerConnection = () => {
        const configuration: RTCConfiguration = {
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        };

        const newPeerConnection = new RTCPeerConnection(configuration);

        newPeerConnection.onicecandidate = handleIceCandidate;
        newPeerConnection.ontrack = (event: RTCTrackEvent) => {
            const [stream] = event.streams;
            setRemoteStream(stream);
        };
        newPeerConnection.onnegotiationneeded = async () => {
            try {
                const offer = await newPeerConnection.createOffer();
                await newPeerConnection.setLocalDescription(offer);
                socket.send(JSON.stringify({ type: "offer", offer }));
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

        setPeerConnection(newPeerConnection);
    };

    const handleCallBtn = () => {
        if (peerConnection && localStream) {
            localStream
                .getTracks()
                .forEach((track) =>
                    peerConnection.addTrack(track, localStream)
                );
        } else {
            console.error("Peer connection not initialized yet!");
        }
    };

    useEffect(() => {
        startVideo();
        initPeerConnection();
    }, []);

    // useEffect(
    //   () => {
    //     if (peerConnection && localStream) {
    //       localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
    //     } else {
    //       console.error('Peer connection not initialized yet!');
    //     }
    //   }, []);

    useEffect(() => {
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type) {
                case "offer":
                    handleOfferReceived(message.offer);
                    break;
                case "answer":
                    handleAnswerReceived(message.answer);
                    break;
                case "iceCandidate":
                    peerConnection?.addIceCandidate(
                        new RTCIceCandidate(message.candidate)
                    );
                    break;
            }
        };
    }, [peerConnection]);

    useEffect(() => {
        if (remoteStream && remoteVideo.current) {
            remoteVideo.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    return (
        <div>
            <video ref={localVideo} autoPlay playsInline />
            <video ref={remoteVideo} autoPlay playsInline />
            <button ref={callButton} onClick={handleCallBtn}>
                Call
            </button>
        </div>
    );
};

export default VideoCall;

"use client";
import React, { useRef, useEffect, useState } from 'react';

const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  const signalingServerUrl = 'ws://localhost:8080';
  const signalingSocket = useRef<WebSocket>(new WebSocket(signalingServerUrl));

  const config: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }, // STUN server
    ],
  };

  useEffect(() => {
    signalingSocket.current.onmessage = async (message) => {
      const data = JSON.parse(message.data);

      if (data.offer) {
        await handleOffer(data.offer);
      } else if (data.answer) {
        await handleAnswer(data.answer);
      } else if (data.iceCandidate) {
        await handleICECandidate(data.iceCandidate);
      }
    };

    startLocalStream();
  }, []);

  const startLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      createPeerConnection(stream);
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  };

  const createPeerConnection = (stream: MediaStream) => {
    const pc = new RTCPeerConnection(config);

    // Add local stream tracks to the peer connection
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    // Handle remote stream
    pc.ontrack = (event) => {
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject !== event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Send ICE candidates to the signaling server
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        signalingSocket.current.send(JSON.stringify({ iceCandidate: event.candidate }));
      }
    };

    setPeerConnection(pc);
  };

  const createOffer = async () => {
    if (peerConnection) {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      signalingSocket.current.send(JSON.stringify({ offer: peerConnection.localDescription }));
    }
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    if (!peerConnection) {
      startLocalStream(); // Ensure we have a peer connection ready
    }

    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      signalingSocket.current.send(JSON.stringify({ answer: peerConnection.localDescription }));
    }
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const handleICECandidate = async (candidate: RTCIceCandidateInit) => {
    try {
      if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.error('Error adding received ICE candidate', error);
    }
  };

  return (
    <div>
      <h1>WebRTC Video Call</h1>
      <video ref={localVideoRef} autoPlay muted style={{ width: '300px', height: '200px', border: '1px solid black' }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: '300px', height: '200px', border: '1px solid black' }} />
      <div>
        <button onClick={createOffer}>Call</button>
      </div>
    </div>
  );
};

export default VideoCall;

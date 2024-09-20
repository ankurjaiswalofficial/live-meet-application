"use client";
import React, { useCallback, useMemo } from 'react';
import { PeerContextInterface } from '@/types/peer-types';

export const PeerContext = React.createContext<PeerContextInterface | null>(null);

function PeerContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const pc = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:stun1.l.google.com:19302" },
                { urls: "stun:stun2.l.google.com:19302" },
                { urls: "stun:stun3.l.google.com:19302" },
                { urls: "stun:stun4.l.google.com:19302" },
            ]
        });

    const createOffer = useCallback(async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        return pc.localDescription;
    }, [pc]);

    const createAnswer = useCallback(async (offer: RTCSessionDescriptionInit) => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        return pc.localDescription;
    }, [pc]);

    const setAnswer = useCallback(async (answer: RTCSessionDescriptionInit) => {
        if (pc.signalingState !== "stable") {
            await pc.setRemoteDescription(answer);
        }
    }, [pc]);

    const setIceCandidate = useCallback(async (candidate: RTCIceCandidateInit) => {
        if (candidate) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
    }, [pc]);

    const addTracks = useCallback((stream: MediaStream) => {
        stream.getTracks().forEach(track => {
            pc.addTrack(track, stream);
        });
    }, [pc]);

    const contextValue = useMemo(() => ({
        pc,
        createOffer,
        createAnswer,
        setAnswer,
        setIceCandidate,
        addTracks,
    }), [pc, createOffer, createAnswer, setAnswer, setIceCandidate, addTracks]);

    return (
        <PeerContext.Provider value={contextValue}>
            {children}
        </PeerContext.Provider>
    );
}

export default PeerContextProvider;

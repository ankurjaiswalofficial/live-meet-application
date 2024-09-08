"use client";
import React, { useCallback, useMemo } from 'react';
import { PeerContextInterface } from '@/types/peer-types';

export const PeerContext = React.createContext<PeerContextInterface | null>(null);

function PeerContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const pc = useMemo(() => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [{
                urls: "stun:stun1.l.google.com:19302"
            }]
        })
        return peerConnection;
    }, []);

    const createOffer = useCallback(async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
    }, [pc]);

    const createAnswer = useCallback(async (offer: RTCSessionDescriptionInit) => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
    }, [pc]);

    const setIceCandidate = useCallback(async (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
            await pc.addIceCandidate(new RTCIceCandidate(event.candidate));
        }
    }, [pc]);

    const contextValue = useMemo(() => ({
        pc,
        createOffer,
        createAnswer,
        setIceCandidate,
    }), [pc, createOffer, createAnswer, setIceCandidate]);

    return (
        <PeerContext.Provider value={contextValue}>
            {children}
        </PeerContext.Provider>
    );
}

export default PeerContextProvider;

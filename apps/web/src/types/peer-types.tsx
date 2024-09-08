interface PeerContextInterface {
    pc: RTCPeerConnection;
    createOffer: () => Promise<void>;
    createAnswer: (offer: RTCSessionDescriptionInit) => Promise<void>;
    setIceCandidate: (event: RTCPeerConnectionIceEvent) => Promise<void>;
}


export { type PeerContextInterface };

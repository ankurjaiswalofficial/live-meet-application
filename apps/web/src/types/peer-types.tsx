interface PeerContextInterface {
    pc: RTCPeerConnection;
    createOffer: () => Promise<any>;
    createAnswer: (offer: RTCSessionDescriptionInit) => Promise<any>;
    setAnswer: (answer: RTCSessionDescriptionInit) => Promise<void>;
    setIceCandidate: (event: RTCIceCandidateInit) => Promise<void>;
    addTracks: (stream: MediaStream) => void;
}


export { type PeerContextInterface };

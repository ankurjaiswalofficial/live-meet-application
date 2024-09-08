import { PeerContext } from "@/context/peerContext";
import { useContext } from "react";

const usePeer = () => {
    const context = useContext(PeerContext);
    if (!context) {
        throw new Error("usePeerContext must be used within a PeerContextProvider");
    }
    return context;
};

export default usePeer;

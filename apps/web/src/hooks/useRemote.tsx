import { RemoteContext } from "@/context/remoteContext";
import { useContext } from "react";

const useRemote = () => {
    const context = useContext(RemoteContext);
    if (!context) {
        throw new Error("useRemote must be used within a RemoteContextProvider");
    }
    return context;
}


export default useRemote;

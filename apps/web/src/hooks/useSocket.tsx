import { SocketContext } from "@/context/socketContext";
import { useContext } from "react";

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
      throw new Error("useSocketContext must be used within a SocketContextProvider");
    }
    return context;
  };
  
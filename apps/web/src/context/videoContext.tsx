"use client";
import React, { createContext, ReactNode, useMemo, useState } from "react";

type VideoContextType = { videoStream: MediaStream | null; setVideoStream: React.Dispatch<React.SetStateAction<MediaStream | null>> }
const VideoContext = createContext<VideoContextType | null>(null);

const VideoContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const contextValue = useMemo(
        () => { return { videoStream, setVideoStream } }, [videoStream]
    )
    return (
        <VideoContext.Provider value={contextValue}>
            {children}
        </VideoContext.Provider>
    )
}


export { VideoContext, type VideoContextType, VideoContextProvider };

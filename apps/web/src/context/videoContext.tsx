"use client";
import React, {createContext, ReactNode, RefObject, useRef} from "react";


const VideoContext = createContext<RefObject<HTMLVideoElement> | null>(null);

const VideoContextProvider = ({children}:Readonly<{ children: ReactNode }>) => {
    const videoRef = useRef(null);

    return (
        <VideoContext.Provider value={videoRef}>
            {children}
        </VideoContext.Provider>
    )
}


export {VideoContext, VideoContextProvider};

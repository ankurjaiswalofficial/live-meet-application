"use client";
import React, {createContext, ReactNode, RefObject, useRef} from "react";


const VideoContext = createContext<RefObject<HTMLVideoElement> | null>(null);

const VideoContextProvider = ({children}:Readonly<{ children: ReactNode }>) => {
    const audioRef = useRef(null);

    return (
        <VideoContext.Provider value={audioRef}>
            {children}
        </VideoContext.Provider>
    )
}


export {VideoContext, VideoContextProvider};
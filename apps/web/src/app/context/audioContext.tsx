"use client";
import React, {createContext, ReactNode, RefObject, useRef} from "react";


const AudioContext = createContext<RefObject<HTMLAudioElement> | null>(null);

const AudioContextProvider = ({children}: Readonly<{ children: ReactNode }>) => {
    const audioRef = useRef(null);

    return (
        <AudioContext.Provider value={audioRef}>
            {children}
        </AudioContext.Provider>
    )
}


export {AudioContext, AudioContextProvider};
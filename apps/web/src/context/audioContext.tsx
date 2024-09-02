"use client";
import React, { createContext, ReactNode, useMemo, useState } from "react";

type AudioContextType = { audioStream: MediaStream | null; setAudioStream: React.Dispatch<React.SetStateAction<MediaStream | null>> }
const AudioContext = createContext<AudioContextType | null>(null);

const AudioContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

    const contextValue = useMemo(
        () => { return { audioStream, setAudioStream } }, [audioStream]
    )
    return (
        <AudioContext.Provider value={contextValue}>
            {children}
        </AudioContext.Provider>
    )
}


export { AudioContext, type AudioContextType, AudioContextProvider };

"use client";
import { MediaContextType } from "@/types/media-types";
import React, { createContext, ReactNode, useMemo, useState } from "react";

const MediaContext = createContext<MediaContextType | null>(null);

const MediaContextProvider = ({ children }: Readonly<{ children: ReactNode }>) => {

    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [screenAudioStream, setScreenAudioStream] = useState<MediaStream | null>(null);
    const [screenVideoStream, setScreenVideoStream] = useState<MediaStream | null>(null);

    const contextValue = useMemo(() => ({
        audioStream,
        setAudioStream,
        videoStream,
        setVideoStream,
        screenAudioStream,
        setScreenAudioStream,
        screenVideoStream,
        setScreenVideoStream,
    }), [audioStream, videoStream, screenAudioStream, screenVideoStream]);

    return (
        <MediaContext.Provider value={contextValue}>
            {children}
        </MediaContext.Provider>
    );
};

export { MediaContext, type MediaContextType, MediaContextProvider };

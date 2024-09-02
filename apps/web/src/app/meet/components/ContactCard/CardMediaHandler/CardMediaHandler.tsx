import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import AudioElement, { AudioElementProps } from "./AudioElement";
import VideoElement, { VideoElementProps } from "./VideoElement";

export interface CardMediaHandlerProps {
    audioActive: boolean;
    videoActive: boolean;
    audioRef: AudioElementProps["audioRef"];
    videoRef: VideoElementProps["videoRef"];
    muted?: boolean;
}

export default function CardMediaHandler({
    audioActive,
    videoActive,
    audioRef,
    videoRef,
    muted,
}: Readonly<CardMediaHandlerProps>) {
    const isVisible = useMemo(() => {
        return videoActive && (audioActive || videoActive);
    }, [audioActive, videoActive]);

    return (
        <div
            className={cn(
                "absolute top-0 left-0 w-full h-full flex items-center",
                { invisible: !isVisible }
            )}
        >
            <VideoElement isActive={videoActive} videoRef={videoRef} />
            <AudioElement muted={muted} audioRef={audioRef} />
        </div>
    );
}

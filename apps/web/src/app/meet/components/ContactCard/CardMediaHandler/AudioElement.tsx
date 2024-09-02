import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AudioElementProps {
    muted?: boolean;
    audioStream?: MediaStream | null;
}

export default function AudioElement({
    muted,
    audioStream,
}: Readonly<AudioElementProps>) {
    const audioRef = useRef<HTMLVideoElement | null>(null);
    useEffect(
        () => {
            if (audioStream && audioRef.current) {
                audioRef.current.srcObject = audioStream;
            }
        },
        [audioStream]
    )
    return (
        <audio
            muted={muted ?? false}
            ref={audioRef}
            autoPlay
            className={cn({ invisible: true })}
        ></audio>
    );
}

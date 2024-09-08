"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { CardMediaHandlerProps } from "@/types/card-types";


export default function CardMediaHandler({ audioActive, videoActive, audioStream, videoStream, muted }: Readonly<CardMediaHandlerProps>) {
    const audioRef = useRef<HTMLVideoElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const isVisible = useMemo(() => { return videoActive && (audioActive || videoActive); }, [audioActive, videoActive]);

    useEffect(
        () => {
            if (audioStream && audioRef.current) {
                audioRef.current.srcObject = audioStream;
            }
        },
        [audioStream]
    )

    useEffect(
        () => {
            if (videoStream && videoRef.current) {
                videoRef.current.srcObject = videoStream;
            }
        },
        [videoStream]
    )
    return (
        <div className={cn("absolute top-0 left-0 w-full h-full flex items-center", { invisible: !isVisible })} >
            <video ref={videoRef} autoPlay muted className={cn("w-full aspect-video -scale-x-[1]", { hidden: !videoActive, })}></video>
            <audio muted={muted} ref={audioRef} autoPlay className={cn({ invisible: true })} ></audio>
        </div>
    );
}

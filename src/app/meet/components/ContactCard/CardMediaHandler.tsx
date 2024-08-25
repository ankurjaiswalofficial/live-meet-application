import { cn } from '@/lib/utils'
import React from 'react'

interface CardMediaHandlerProps {
    videoRef: any;
    audioRef: any;
}

export default function CardMediaHandler({ videoRef, audioRef }: Readonly<CardMediaHandlerProps>) {
    return (
        <div className={cn("absolute top-0 left-0 w-full h-full flex items-center", (audioRef || videoRef) ?? "invisible")}>
            <video ref={videoRef} autoPlay className={cn("w-full aspect-video -scale-x-[1]", videoRef ?? "hidden")}></video>
            <audio ref={audioRef} autoPlay className={cn({ "invisible": true })}></audio>
        </div>
    )
}

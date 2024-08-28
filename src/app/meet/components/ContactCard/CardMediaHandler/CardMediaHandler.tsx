import { cn } from '@/lib/utils'
import React from 'react'
import AudioElement from "@/app/meet/components/ContactCard/CardMediaHandler/AudioElement";
import VideoElement from "@/app/meet/components/ContactCard/CardMediaHandler/VideoElement";

interface CardMediaHandlerProps {
    videoRef: any;
    audioRef: any;
}

export default function CardMediaHandler({ videoRef, audioRef }: Readonly<CardMediaHandlerProps>) {
    return (
        <div className={cn("absolute top-0 left-0 w-full h-full flex items-center", (audioRef || videoRef) ?? "invisible")}>
            <VideoElement videoRef={videoRef} />
            <AudioElement />
        </div>
    )
}

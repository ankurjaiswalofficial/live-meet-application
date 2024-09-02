import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface VideoElementProps {
    isActive: boolean;
    videoStream?: MediaStream | null;
}

export default function VideoElement({
    isActive,
    videoStream,
}: Readonly<VideoElementProps>) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(
        () => {
            if (videoStream && videoRef.current) {
                videoRef.current.srcObject = videoStream;
            }
        },
        [videoStream]
    )
    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            className={cn("w-full aspect-video -scale-x-[1]", {
                hidden: !isActive,
            })}
        ></video>
    );
}

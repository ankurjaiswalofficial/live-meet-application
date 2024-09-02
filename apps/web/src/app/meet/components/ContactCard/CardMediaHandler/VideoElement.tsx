import React, { MutableRefObject } from "react";
import { cn } from "@/lib/utils";

export interface VideoElementProps {
    isActive: boolean;
    videoRef: MutableRefObject<HTMLVideoElement> | null;
}

export default function VideoElement({
    isActive,
    videoRef,
}: Readonly<VideoElementProps>) {
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

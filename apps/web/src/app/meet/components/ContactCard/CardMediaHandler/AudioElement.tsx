import { cn } from "@/lib/utils";
import { MutableRefObject } from "react";

export interface AudioElementProps {
    muted?: boolean;
    audioRef: MutableRefObject<HTMLAudioElement> | null;
}

export default function AudioElement({
    muted,
    audioRef,
}: Readonly<AudioElementProps>) {
    return (
        <audio
            muted={muted ?? false}
            ref={audioRef}
            autoPlay
            className={cn({ invisible: true })}
        ></audio>
    );
}

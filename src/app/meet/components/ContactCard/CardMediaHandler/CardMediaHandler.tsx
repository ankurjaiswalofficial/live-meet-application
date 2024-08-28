import React from 'react'
import {RootState} from '@/app/redux/store';
import {cn} from '@/lib/utils'
import AudioElement from "@/app/meet/components/ContactCard/CardMediaHandler/AudioElement";
import VideoElement from "@/app/meet/components/ContactCard/CardMediaHandler/VideoElement";
import {useSelector} from "react-redux";

export default function CardMediaHandler() {
    const {audioActive, videoActive}: {
        audioActive: boolean,
        videoActive: boolean
    } = useSelector((state: RootState) => ({
        audioActive: state.audioHandler.isActive,
        videoActive: state.videoHandler.isActive,
    }));
    return (
        <div
            className={cn("absolute top-0 left-0 w-full h-full flex items-center", {"invisible": (audioActive || videoActive)})}>
            <VideoElement/>
            <AudioElement/>
        </div>
    )
}

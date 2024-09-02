import React, {useMemo} from 'react';
import {RootState} from '@/redux/store';
import {cn} from '@/lib/utils';
import AudioElement from "@/app/meet/components/ContactCard/CardMediaHandler/AudioElement";
import VideoElement from "@/app/meet/components/ContactCard/CardMediaHandler/VideoElement";
import {useSelector} from "react-redux";

export default function CardMediaHandler() {
    const audioActive = useSelector((state: RootState) => state.audioHandler.isActive);
    const videoActive = useSelector((state: RootState) => state.videoHandler.isActive);

    const isVisible = useMemo(() => {
        return videoActive && (audioActive || videoActive);
    }, [audioActive, videoActive]);

    return (
        <div
            className={cn("absolute top-0 left-0 w-full h-full flex items-center", {"invisible": !isVisible})}>
            <VideoElement/>
            <AudioElement/>
        </div>
    )
}

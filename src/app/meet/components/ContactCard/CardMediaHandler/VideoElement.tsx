import React, {useContext} from 'react'
import {RootState} from '@/app/redux/store';
import {cn} from '@/lib/utils'
import {VideoContext} from "@/app/context/videoContext";
import {useSelector} from "react-redux";

export default function VideoElement() {
    const isActive: boolean = useSelector((state: RootState) => state.videoHandler.isActive);
    const videoRef = useContext(VideoContext);
    return (
        <video ref={videoRef} autoPlay
               className={cn("w-full aspect-video -scale-x-[1]", {"hidden": !isActive})}></video>
    )
}

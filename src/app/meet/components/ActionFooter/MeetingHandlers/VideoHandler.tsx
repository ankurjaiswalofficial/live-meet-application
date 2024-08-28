import React, {RefObject, useContext} from 'react'
import {RootState} from "@/app/redux/store";
import {Video, VideoOff} from 'lucide-react'
import TooltipIconButton from '@/components/TooltipIconButton'
import {useSelector} from "react-redux";
import {useAppDispatch} from "@/app/redux/hooks";
import {toggleVideo} from "@/app/redux/slices/videoSlice";
import {VideoContext} from "@/app/context/videoContext";


export default function VideoHandler() {
    const videoRef = useContext<RefObject<HTMLVideoElement> | null >(VideoContext);
    const isActive: boolean = useSelector((state: RootState) => state.videoHandler.isActive);
    const dispatch = useAppDispatch();
    const handleVideoActive = () => {
        console.log("Mic Clicked state => ", isActive);
        dispatch(toggleVideo(videoRef));
    }
    return (
        <TooltipIconButton
            title="Turn on video"
            className=""
            required
            active={isActive}
            onClick={handleVideoActive}
        >
            {isActive ? (
                <Video className="h-5 w-5"/>
            ) : (
                <VideoOff className="h-5 w-5"/>
            )}
        </TooltipIconButton>
    )
}

import React, { RefObject, useContext } from 'react'
import { RootState } from "@/redux/store";
import { Video, VideoOff } from 'lucide-react'
import TooltipIconButton from '@/components/TooltipIconButton'
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { toggleVideo } from "@/redux/slices/videoSlice";
import { VideoContext, VideoContextType } from "@/context/videoContext";


export default function VideoHandler() {
    const videoContext = useContext<VideoContextType | null>(VideoContext);
    const isActive: boolean = useSelector((state: RootState) => state.videoHandler.isActive);
    const dispatch = useAppDispatch();
    const handleVideoActive = () => {
        console.log("Camera Clicked before state => ", isActive);
        if (videoContext) { dispatch(toggleVideo(videoContext)); }
        console.log("Camera Clicked after state => ", isActive);
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
                <Video className="h-5 w-5" />
            ) : (
                <VideoOff className="h-5 w-5" />
            )}
        </TooltipIconButton>
    )
}

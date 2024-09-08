import React from 'react'
import { Video, VideoOff } from 'lucide-react'
import TooltipIconButton from '@/components/TooltipIconButton'
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useMedia from '@/hooks/useMedia';
import useMediaStatus from '@/hooks/useMediaStatus';


export default function VideoHandler() {
    const {videoStream, setVideoStream}= useMedia();
    const {videoActive, toggleVideo} = useMediaStatus();
    const dispatch = useAppDispatch();

    const handleVideoActive = () => {
        dispatch(toggleVideo({videoStream, setVideoStream}));
    }
    
    return (
        <TooltipIconButton
            title="Turn on video"
            className=""
            required
            active={videoActive}
            onClick={handleVideoActive}
        >
            {videoActive ? (
                <Video className="h-5 w-5" />
            ) : (
                <VideoOff className="h-5 w-5" />
            )}
        </TooltipIconButton>
    )
}

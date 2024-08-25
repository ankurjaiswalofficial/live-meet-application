import React from 'react'
import { Video, VideoOff } from 'lucide-react'
import TooltipIconButton from '@/components/TooltipIconButton'

export default function VideoHandler() {
    const [videoActive, setVideoActive] = React.useState(false);
    const handleVideoActive = () => {
        setVideoActive(!videoActive)
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

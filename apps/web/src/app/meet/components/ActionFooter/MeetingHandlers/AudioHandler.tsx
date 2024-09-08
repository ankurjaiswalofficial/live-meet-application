import React from 'react'
import { useAppDispatch } from "@/hooks/useAppDispatch";
import useMedia from '@/hooks/useMedia';
import useMediaStatus from '@/hooks/useMediaStatus';
import { Mic, MicOff } from 'lucide-react'
import TooltipIconButton from '@/components/TooltipIconButton'

export default function AudioHandler() {
    const { audioStream, setAudioStream } = useMedia();
    const { audioActive, toggleAudio } = useMediaStatus();
    const dispatch = useAppDispatch();

    const handleAudioActive = () => {
        dispatch(toggleAudio({ audioStream, setAudioStream }));
    };

    return (
        <TooltipIconButton
            title="Turn on microphone"
            className=""
            required
            active={audioActive}
            onClick={handleAudioActive}
        >
            {audioActive ? (
                <Mic className="h-5 w-5" />
            ) : (
                <MicOff className="h-5 w-5" />
            )}
        </TooltipIconButton>
    )
}

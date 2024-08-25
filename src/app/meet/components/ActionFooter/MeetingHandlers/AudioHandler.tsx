import TooltipIconButton from '@/components/TooltipIconButton'
import { Mic, MicOff } from 'lucide-react'
import React from 'react'

export default function AudioHandler() {
    const [audioActive, setAudioActive] = React.useState(false);
    const handleAudioActive = () => {
        setAudioActive(!audioActive)
    }
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

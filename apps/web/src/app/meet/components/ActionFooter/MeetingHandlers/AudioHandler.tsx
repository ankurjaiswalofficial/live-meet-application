import React, { RefObject, useContext } from 'react'
import { RootState } from '@/redux/store';
import TooltipIconButton from '@/components/TooltipIconButton'
import { Mic, MicOff } from 'lucide-react'
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { toggleAudio } from "@/redux/slices/audioSlice";
import { AudioContext, AudioContextType } from "@/context/audioContext";

export default function AudioHandler() {
    const audioContext = useContext<AudioContextType | null>(AudioContext);
    const isActive: boolean = useSelector((state: RootState) => state.audioHandler.isActive);
    const dispatch = useAppDispatch();
    const handleAudioActive = () => {
        console.log("Mic Clicked before state => ", isActive);
        if (audioContext) { dispatch(toggleAudio(audioContext)); }
        console.log("Mic Clicked after state => ", isActive);
    };

    return (
        <TooltipIconButton
            title="Turn on microphone"
            className=""
            required
            active={isActive}
            onClick={handleAudioActive}
        >
            {isActive ? (
                <Mic className="h-5 w-5" />
            ) : (
                <MicOff className="h-5 w-5" />
            )}
        </TooltipIconButton>
    )
}

import React, {RefObject, useContext} from 'react'
import {RootState} from '@/app/redux/store';
import TooltipIconButton from '@/components/TooltipIconButton'
import {Mic, MicOff} from 'lucide-react'
import {useSelector} from "react-redux";
import {useAppDispatch} from "@/app/redux/hooks";
import {toggleAudio} from "@/app/redux/slices/audioSlice";
import {AudioContext} from "@/app/context/audioContext";

export default function AudioHandler() {
    const audioRef = useContext<RefObject<HTMLAudioElement> | null>(AudioContext);
    const isActive: boolean = useSelector((state: RootState) => state.audioHandler.isActive);
    const dispatch = useAppDispatch();
    const handleAudioActive = () => {
        console.log("Mic Clicked state => ", isActive);
        dispatch(toggleAudio(audioRef));
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
                <Mic className="h-5 w-5"/>
            ) : (
                <MicOff className="h-5 w-5"/>
            )}
        </TooltipIconButton>
    )
}

import {TooltipProvider} from '@/components/ui/tooltip'
import React, {ReactNode} from 'react'
import {AudioContextProvider} from "@/app/context/audioContext";
import {VideoContextProvider} from "@/app/context/videoContext";

export default function Providers({children}: Readonly<{ children: ReactNode }>) {

    return (
        <TooltipProvider delayDuration={50}>
            <VideoContextProvider>
                <AudioContextProvider>
                    {children}
                </AudioContextProvider>
            </VideoContextProvider>
        </TooltipProvider>
    )
}

// import useMedia from '@/hooks/useMedia';
// import usePeer from '@/hooks/usePeer';
// import { useSocket } from '@/hooks/useSocket'
import React from 'react'

export default function MeetBase({ children }: Readonly<{ children: React.ReactNode }>) {
    // const { socket } = useSocket();
    // const { pc, createOffer, createAnswer, setIceCandidate, } = usePeer();
    // const {audioStream, setAudioStream, videoStream, setVideoStream, screenAudioStream, setScreenAudioStream, screenVideoStream, setScreenVideoStream,} = useMedia();
    // // const {}

    return (
        <div className="bg-neutral-900 text-white flex flex-col items-center justify-center min-h-screen w-screen">
            {children}
        </div>
    )
}

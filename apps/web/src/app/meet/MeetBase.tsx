"use client";
import useMeetInfo from '@/hooks/useMeetInfo';
import useMedia from '@/hooks/useMedia';
import { useSocket } from '@/hooks/useSocket'
import useUser from '@/hooks/useUser';
import React, { useCallback, useEffect, useState } from 'react'
import useMediaStatus from '@/hooks/useMediaStatus';
import useRemote from '@/hooks/useRemote';

export default function MeetBase({ children }: Readonly<{ children: React.ReactNode }>) {
    const { meetId } = useMeetInfo();
    const { userData } = useUser();
    const { socket } = useSocket();
    const { audioStream, videoStream } = useMedia();
    const { audioActive, videoActive } = useMediaStatus();
    const { remoteContent, setRemoteContent } = useRemote();
    const [peers, setPeers] = useState<{ [Key: string]: RTCPeerConnection[] } | null>(null);

    useEffect(() => {
        socket.emit("open", "Open Socket Test");
        socket.emit("join-meet", { meetId: meetId, userData: userData });
        socket.on("join-meet", (data) => {
            console.log(data);
        })
        return () => {
            socket.close()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="bg-neutral-900 text-white flex flex-col items-center justify-center min-h-screen w-screen">
            {children}
        </div>
    )
}

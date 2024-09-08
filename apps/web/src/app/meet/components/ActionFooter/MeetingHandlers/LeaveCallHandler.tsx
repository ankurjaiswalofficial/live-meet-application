import TooltipIconButton from '@/components/TooltipIconButton'
import useMedia from '@/hooks/useMedia';
import useMediaStatus from '@/hooks/useMediaStatus';
import usePeer from '@/hooks/usePeer';
import useRemote from '@/hooks/useRemote';
import { useSocket } from '@/hooks/useSocket';
import { Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

export default function LeaveCallHandler() {
    const router = useRouter();
    const { socket } = useSocket();
    const { pc } = usePeer();
    const { setRemoteContent } = useRemote();
    const { setAudioStream, setVideoStream, setScreenAudioStream, setScreenVideoStream } = useMedia();
    const { setAudioInactive, setVideoInactive, setScreenInactive } = useMediaStatus();

    const handleLeaveCall = useCallback(() => {
        pc.close();
        socket.disconnect();
        setAudioInactive();
        setVideoInactive();
        setScreenInactive();
        setAudioStream(null);
        setVideoStream(null);
        setScreenAudioStream(null);
        setScreenVideoStream(null);
        setRemoteContent({});
        router.push("/");
    }, [pc, router, setAudioInactive, setAudioStream, setRemoteContent, setScreenAudioStream, setScreenInactive, setScreenVideoStream, setVideoInactive, setVideoStream, socket])

    return (
        <TooltipIconButton
            title="Leave call"
            className="hidden sm:flex w-14"
            onClick={handleLeaveCall}
            required
        >
            <Phone className="h-5 w-5 rotate-[135deg] fill-white" />
        </TooltipIconButton>
    )
}

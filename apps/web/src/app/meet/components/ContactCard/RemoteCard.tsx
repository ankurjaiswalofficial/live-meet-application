import React, { RefObject, useRef } from 'react'
import ContactCard, { UserData } from './ContactCard';

export interface RemoteDataProps {
    audioActive: boolean;
    videoActive: boolean;
    audioStream: MediaStream | null;
    videoStream: MediaStream | null;
    userData: UserData;
}

export interface RemoteCardProps { remoteData: RemoteDataProps };

function RemoteCard({ remoteData }: Readonly<RemoteCardProps>) {

    return (
        <ContactCard
            audioActive={remoteData.audioActive}
            videoActive={remoteData.videoActive}
            audioStream={remoteData.audioStream}
            videoStream={remoteData.videoStream}
            muted={remoteData.audioActive}
            userData={remoteData.userData}
        />
    )
}

export default RemoteCard

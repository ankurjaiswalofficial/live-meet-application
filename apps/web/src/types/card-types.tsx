import React from 'react';
import { UserDataInterface } from "./user-types";

interface CardMediaHandlerProps {
    audioActive: boolean | null;
    videoActive: boolean | null;
    audioStream: MediaStream | null;
    videoStream: MediaStream | null;
    muted: boolean;
}

interface ContactCardProps extends CardMediaHandlerProps {
    userData: UserDataInterface;
}

interface RemoteCardProps {
    remoteData: ContactCardProps
}

interface RemoteContextProps {
    remoteContent: { [peerId: string]: ContactCardProps };
    setRemoteContent: React.Dispatch<React.SetStateAction<{ [peerId: string]: ContactCardProps }>>;
}

export type { CardMediaHandlerProps, ContactCardProps, RemoteCardProps, RemoteContextProps };

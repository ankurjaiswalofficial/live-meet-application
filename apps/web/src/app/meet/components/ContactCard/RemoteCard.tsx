import React from "react";
import ContactCard from "./ContactCard";
import { RemoteCardProps } from "@/types/card-types";


function RemoteCard({ remoteData }: Readonly<RemoteCardProps>) {
    return (
        <ContactCard
            audioActive={remoteData.audioActive}
            videoActive={remoteData.videoActive}
            audioStream={remoteData.audioStream}
            videoStream={remoteData.videoStream}
            userData={remoteData.userData}
            muted={remoteData.muted}
        />
    );
}

export default RemoteCard;

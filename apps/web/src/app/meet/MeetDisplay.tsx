"use client";

import React, { useContext } from "react";
import ContactCard from "./components/ContactCard/ContactCard";
import { useSelector } from "react-redux";
import { VideoContext } from "@/context/videoContext";
import { AudioContext } from "@/context/audioContext";
import { RootState } from "@/redux/store";
import RemoteCard from "./components/ContactCard/RemoteCard";
import { RemoteContext } from "@/context/remoteContext";
import { UserContext } from "@/context/userContext";

export default function MeetDisplay() {
    const muted = true;
    const userContext = useContext(UserContext);
    const videoContext = useContext(VideoContext);
    const audioContext = useContext(AudioContext);
    const remoteContext = useContext(RemoteContext);
    const audioActive: boolean = useSelector((state: RootState) => state.audioHandler.isActive);
    const videoActive: boolean = useSelector((state: RootState) => state.videoHandler.isActive);

    return (
        <div className="relative p-4 w-full grid grid-flow-col grid-cols-1 h-[calc(100vh_-_5rem)] gap-2">
            {remoteContext.map((data, index) => (
                <RemoteCard remoteData={data} key={`RemotePeerCard_${data.userData.userId}_${String(index)}`} />
            ))}
            <div className="absolute bottom-4 right-4">
                {userContext
                    && <ContactCard
                        audioActive={audioActive}
                        videoActive={videoActive}
                        audioStream={audioContext?.audioStream}
                        videoStream={videoContext?.videoStream}
                        muted={muted}
                        userData={userContext}
                    />}
            </div>
        </div>
    );
}

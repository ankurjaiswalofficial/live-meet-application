"use client";
import React from "react";
import useMediaStatus from "@/hooks/useMediaStatus";
import useMedia from "@/hooks/useMedia";
import useUser from "@/hooks/useUser";
// import RemoteCard from "./components/ContactCard/RemoteCard";
import ContactCard from "./components/ContactCard/ContactCard";
import useRemote from "@/hooks/useRemote";

export default function MeetDisplay() {
    const { userData } = useUser();
    // const { remoteContent } = useRemote();
    const { videoActive } = useMediaStatus();
    const { audioStream, videoStream } = useMedia();

    return (
        <div className="relative p-4 w-full grid grid-flow-col grid-cols-1 h-[calc(100vh_-_5rem)] gap-2">
            {/* {Object.keys(remoteContent).map((peerId, index) => (
                <RemoteCard remoteData={remoteContent[peerId]} key={`RemotePeerCard_${peerId}_${String(index)}`} />
            ))} */}
            <div className="absolute bottom-4 right-4">
                {userData && (
                    <ContactCard
                        audioActive={false}
                        videoActive={videoActive}
                        audioStream={audioStream}
                        videoStream={videoStream}
                        userData={userData}
                        muted={true}
                    />
                )}
            </div>
        </div>
    );
}

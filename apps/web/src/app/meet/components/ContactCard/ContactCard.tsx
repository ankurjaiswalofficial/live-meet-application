"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Mic, MicOff } from "lucide-react";
import TinyIconTag from "@/components/TinyIconTag";
import CardAvatar from "./CardAvatar";
import CardUserIdentifierTag from "./CardUserIdentifierTag";
import CardMediaHandler from "./CardMediaHandler";
import { UserDataInterface } from "@/types/user-types";
import { ContactCardProps } from "@/types/card-types";


export default function ContactCard({ audioActive, videoActive, audioStream, videoStream, userData, muted }: Readonly<ContactCardProps>) {
    const [user,] = React.useState<UserDataInterface>(userData);
    return (
        <Card
            id={user.peerId}
            className="relative flex items-center justify-center rounded-lg bg-neutral-900 border-neutral-800 overflow-hidden min-w-80 min-h-44 w-full h-full"
        >
            <CardAvatar
                activeHandler={videoActive}
                fallbackText={user.username}
                imgSrc={user.imgSrc ?? ""}
            />
            <CardMediaHandler
                audioActive={audioActive}
                videoActive={videoActive}
                audioStream={audioStream}
                videoStream={videoStream}
                muted={muted}
            />
            <TinyIconTag
                className=""
                ActiveIcon={Mic}
                FallbackIcon={MicOff}
                activeHandler={audioActive}
                absoluted
            />
            <CardUserIdentifierTag username={user.username} pin={true} />
        </Card>
    );
}

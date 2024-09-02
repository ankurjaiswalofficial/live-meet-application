"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Mic, MicOff } from "lucide-react";
import TinyIconTag from "@/components/TinyIconTag";
import CardAvatar from "./CardAvatar";
import CardUserIdentifierTag from "./CardUserIdentifierTag";
import CardMediaHandler, {
    CardMediaHandlerProps,
} from "./CardMediaHandler/CardMediaHandler";

export interface UserData {
    username: string;
    email: string;
    imgSrc?: string | null;
    userId: string;
}

export interface ContactCardProps extends CardMediaHandlerProps {
    userData: UserData;
}

export default function ContactCard({
    audioActive,
    videoActive,
    audioStream,
    videoStream,
    muted,
    userData,
}: Readonly<ContactCardProps>) {
    const [user, setUser] = React.useState<UserData>(userData);
    return (
        <Card
            id={user.userId}
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
                muted={muted}
                audioStream={audioStream}
                videoStream={videoStream}
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

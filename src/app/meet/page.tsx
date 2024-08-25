"use client";
import TooltipIconButton from "@/components/TooltipIconButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import dayjs from "dayjs";
import {
    ArrowUpSquare,
    BadgeInfo,
    Captions,
    CircleDot,
    Fullscreen,
    Hand,
    Info,
    LayoutDashboardIcon,
    MessageSquareTextIcon,
    MessageSquareWarningIcon,
    Mic,
    MicOff,
    MoreVertical,
    Phone,
    PinIcon,
    PinOff,
    Settings,
    ShieldCheck,
    Smile,
    UsersRound,
    Video,
    VideoOff,
} from "lucide-react";
import * as React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TinyIconTag from "@/components/TinyIconTag";
import CardUserIdentifierTag from "./components/ContactCard/CardUserIdentifierTag";
import CardAvatar from "./components/ContactCard/CardAvatar";
import ContactCard from "./components/ContactCard/ContactCard";
import { useFullscreen } from "../contexts/FullscreenContext";
import MeetInfo from "./components/ActionFooter/MeetInfo";
import ControlHandlers from "./components/ActionFooter/ControlHandlers";
import ActionFooter from "./components/ActionFooter/ActionFooter";

function Meet() {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = React.useState(dayjs());
    const [videoActive, setVideoActive] = React.useState(false);
    const [audioActive, setAudioActive] = React.useState(false);
    const [emojiActive, setEmojiActive] = React.useState(false);
    const [raiseHandActive, setRaiseHandActive] = React.useState(false);
    const [screenPresentActive, setScreenPresentActive] = React.useState(false);
    const ufl = useFullscreen();
    const handleVideoActive = React.useCallback(async () => {
        if (videoActive) {
            if (videoRef.current && videoRef.current.srcObject) {
                const videoStream = videoRef.current.srcObject as MediaStream;
                const videoTracks = videoStream.getTracks();
                videoTracks.forEach((track) => track.stop());
            }
            setVideoActive(false);
        } else {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    setVideoActive(true);
                }
            } catch (error) {
                console.error("Error accessing video media device:", error);
            }
        }
    }, [videoActive]);

    const handleAudioActive = React.useCallback(async () => {
        if (audioActive) {
            if (audioRef.current && audioRef.current.srcObject) {
                const audioStream = audioRef.current.srcObject as MediaStream;
                const audioTracks = audioStream.getTracks();
                audioTracks.forEach((track) => track.stop());
            }
            setAudioActive(false);
        } else {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                if (audioRef.current) {
                    audioRef.current.srcObject = mediaStream;
                    audioRef.current.play();
                    setAudioActive(true);
                }
            } catch (error) {
                console.error("Error accessing video media device:", error);
            }
        }
    }, [audioActive]);
    const handleEmojiActive = () => {
        setEmojiActive(!emojiActive);
    };
    const handleRaiseHandActive = () => {
        setRaiseHandActive(!raiseHandActive);
    };
    const handleScreenPresentActive = () => {
        setScreenPresentActive(!screenPresentActive);
    };

    React.useEffect(() => {
    }, [videoActive, handleVideoActive]);

    React.useEffect(() => {
    }, [audioActive, handleAudioActive]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <TooltipProvider delayDuration={50}>
            <div className="bg-neutral-900 text-white flex flex-col items-center justify-center min-h-screen w-screen">
                <div className="relative p-4 w-full grid grid-flow-col grid-cols-1 h-[calc(100vh_-_5rem)] gap-2">
                    {[1].map((_, index) => (
                        <ContactCard key={index} />
                    ))}
                    <div className="absolute bottom-4 right-4">
                        <ContactCard />
                    </div>
                </div>
                <ActionFooter />
            </div>
        </TooltipProvider>
    );
}

export default Meet;

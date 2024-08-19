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

function Meet() {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = React.useState(dayjs());
    const [videoActive, setVideoActive] = React.useState(false);
    const [audioActive, setAudioActive] = React.useState(false);
    const [emojiActive, setEmojiActive] = React.useState(false);
    const [raiseHandActive, setRaiseHandActive] = React.useState(false);
    const [screenPresentActive, setScreenPresentActive] = React.useState(false);

    const handleVideoActive = async () => {
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
                }
                setVideoActive(true);
            } catch (error) {
                console.error("Error accessing video media device:", error);
            }
        }
    };

    const handleAudioActive = () => {
        setAudioActive(!audioActive);
    };
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
        handleVideoActive();
    }, [videoActive]);

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
                        <Card
                            key={index}
                            className="relative flex items-center justify-center rounded-lg bg-neutral-900 mx-28 border-neutral-800 overflow-hidden"
                        >
                            {videoActive ? (
                                <video ref={videoRef} autoPlay className="w-full h-fit"></video>
                            ) : (
                                <Avatar className="min-w-max w-28 h-28 shadow-md">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                            )}
                            <div className="absolute top-4 right-4">
                                <TooltipIconButton title="Mic On">
                                    <Mic className="h-5 w-5" />
                                </TooltipIconButton>
                            </div>
                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                <TooltipIconButton title="Pinned" className="h-6 w-6">
                                    <PinOff className="h-5 w-5" />
                                </TooltipIconButton>
                                <p className="text-base text-white">Ankur Jaiswal</p>
                            </div>
                        </Card>
                    ))}
                    <div className="absolute bottom-4 right-4">
                        <Card className="relative flex items-center justify-center rounded-lg bg-neutral-900 p-4 w-60 h-36 border-neutral-800 overflow-hidden">
                            <Avatar className="min-w-max w-16 h-16 shadow-md">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <div className="absolute top-2 right-2">
                                <TooltipIconButton title="Mic On" className="w-8 h-8">
                                    <Mic className="h-4 w-4" />
                                </TooltipIconButton>
                            </div>
                            <div className="absolute bottom-2 left-2 flex items-center gap-2">
                                <TooltipIconButton title="Pinned" className="h-8 w-8">
                                    <PinOff className="h-4 w-4" />
                                </TooltipIconButton>
                                <p className="text-sm text-white">Ankur Jaiswal</p>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between w-full min-h-18 h-20">
                    <div className="h-full flex items-center justify-start gap-2">
                        <div className="h-fit flex items-center justify-start space-x-2 px-4 text-base font-semibold">
                            <p className="hidden xl:block">{currentTime.format("HH:mm")}</p>
                            <Separator
                                orientation="vertical"
                                className="pr-0.5 h-5 bg-muted hidden xl:block"
                            />
                            <p>asd-fggh-ert</p>
                        </div>
                    </div>
                    <div className="h-full flex items-center justify-center">
                        <div className="flex items-center justify-center gap-3">
                            <TooltipIconButton
                                title="Turn on microphone"
                                className=""
                                required
                                active={audioActive}
                                onClick={handleAudioActive}
                            >
                                {audioActive ? (
                                    <Mic className="h-5 w-5" />
                                ) : (
                                    <MicOff className="h-5 w-5" />
                                )}
                            </TooltipIconButton>
                            <TooltipIconButton
                                title="Turn on video"
                                className=""
                                required
                                active={videoActive}
                                onClick={handleVideoActive}
                            >
                                {videoActive ? (
                                    <Video className="h-5 w-5" />
                                ) : (
                                    <VideoOff className="h-5 w-5" />
                                )}
                            </TooltipIconButton>
                            <TooltipIconButton
                                title="Send a reaction"
                                className="hidden sm:flex"
                                active={emojiActive}
                                onClick={handleEmojiActive}
                            >
                                <Smile className="h-5 w-5" />
                            </TooltipIconButton>
                            <TooltipIconButton
                                title="Present now"
                                className="hidden sm:flex"
                                active={screenPresentActive}
                                onClick={handleScreenPresentActive}
                            >
                                <ArrowUpSquare className="h-5 w-5" />
                            </TooltipIconButton>
                            <TooltipIconButton
                                title="Raise Hand"
                                className="hidden sm:flex"
                                active={raiseHandActive}
                                onClick={handleRaiseHandActive}
                            >
                                <Hand className="h-5 w-5" />
                            </TooltipIconButton>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <TooltipIconButton
                                        title="More options"
                                        className="hidden sm:flex"
                                    >
                                        <MoreVertical className="h-5 w-5" />
                                    </TooltipIconButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="max-w-80 text-neutral-600">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem disabled className={"h-12"}>
                                            <div className="w-full flex flex-row items-center justify-start">
                                                <CircleDot className="w-6 h-6 mr-2" />
                                                <div className="flex flex-col items-start justify-center">
                                                    <p>Recording Unavailable</p>
                                                    <p className="text-xs">
                                                        You&apos;re not allowed to record this video call
                                                    </p>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className={"h-12"}>
                                            <div className="w-full flex flex-row items-center justify-start">
                                                <LayoutDashboardIcon className="w-6 h-6 mr-2" />
                                                <div className="flex flex-col items-start justify-center">
                                                    <p>Change Layout</p>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className={"h-12"}>
                                            <div className="w-full flex flex-row items-center justify-start">
                                                <Fullscreen className="w-6 h-6 mr-2" />
                                                <div className="flex flex-col items-start justify-center">
                                                    <p>Full Screen</p>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className={"h-12"}>
                                            <div className="w-full flex flex-row items-center justify-start">
                                                <MessageSquareWarningIcon className="w-6 h-6 mr-2" />
                                                <div className="flex flex-col items-start justify-center">
                                                    <p>Report a problem</p>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className={"h-12"}>
                                            <div className="w-full flex flex-row items-center justify-start">
                                                <BadgeInfo className="w-6 h-6 mr-2 rotate-180" />
                                                <div className="flex flex-col items-start justify-center">
                                                    <p>Report abuse</p>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className={"h-12"}>
                                            <div className="w-full flex flex-row items-center justify-start">
                                                <Settings className="w-6 h-6 mr-2" />
                                                <div className="flex flex-col items-start justify-center">
                                                    <p>Settings</p>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <TooltipIconButton
                                title="Leave call"
                                className="hidden sm:flex w-14"
                                required
                            >
                                <Phone className="h-5 w-5 rotate-[135deg] fill-white" />
                            </TooltipIconButton>
                        </div>
                    </div>
                    <div className="h-full flex items-center justify-end px-4">
                        <div className="flex items-center justify-end gap-3">
                            <TooltipIconButton title="Meeting Details" ghost>
                                <Info className="h-5 w-5" />
                            </TooltipIconButton>
                            <TooltipIconButton title="Show everyone" ghost>
                                <UsersRound className="h-5 w-5" />
                            </TooltipIconButton>
                            <TooltipIconButton title="Show everyone" ghost>
                                <MessageSquareTextIcon className="h-5 w-5" />
                            </TooltipIconButton>
                            <TooltipIconButton title="Host controls" ghost>
                                <ShieldCheck className="h-5 w-5" />
                            </TooltipIconButton>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}

export default Meet;

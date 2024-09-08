"use client";
import React, { useRef } from 'react';
import { useRouter } from "next/navigation";
import { Keyboard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { meetSliceActions } from '@/redux/slices/meetSlice';

const MeetWithCode = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleJoinMeet = () => {
        if (inputRef.current?.value) {
            dispatch(meetSliceActions.setMeetId(inputRef.current?.value))
            // router.push("/" + String(_meetId));
            router.push("/meet");
        }
    }

    return (
        <div className="flex-grow flex flex-row flex-wrap items-center justify-start gap-2">
            <div className="relative w-64">
                <Keyboard
                    className="absolute top-[50%] translate-y-[-50%] left-3 h-6 w-6 text-muted-foreground " />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Enter your code or link"
                    className="text-base rounded-lg bg-background flex-grow p-6 pl-12"
                />
            </div>
            <Button variant={"ghost"} onClick={handleJoinMeet}
                className="text-base gap-2 p-6 text-blue-700 hover:bg-blue-100 hover:text-blue-800">Join</Button>
        </div>
    )
}

export default MeetWithCode

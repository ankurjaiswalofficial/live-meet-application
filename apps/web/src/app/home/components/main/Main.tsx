"use client";
import React, { useRef } from "react";
import Link from "next/link"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import MeetingMenu from "./components/MeetingMenu/MeetingMenu";
import MeetWithCode from "./components/MeetWithCode";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {  generateFakeUser } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userSliceActions } from "@/redux/slices/userSlice";

const Main = () => {
    const dispatch = useAppDispatch();
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const peerIdRef = useRef<HTMLInputElement | null>(null);
    const imgSrcRef = useRef<HTMLInputElement | null>(null);

    const generateUserData = () => {
        if (usernameRef.current && emailRef.current && peerIdRef.current && imgSrcRef.current) {
            usernameRef.current.value = `UserName${generateFakeUser()}`
            emailRef.current.value = `Email${generateFakeUser()}@email.com`
            peerIdRef.current.value = `PeerId${generateFakeUser()}`
            imgSrcRef.current.value = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            const userData = {
                imgSrc: imgSrcRef.current?.value,
                username: usernameRef.current?.value,
                email: emailRef.current?.value,
                peerId: peerIdRef.current?.value,
            }
            dispatch(userSliceActions.setUser(userData))
        }
    }

    return (
        <main
            className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-row gap-4 bg-muted dark:bg-background p-4 md:gap-8 md:p-10">
            <Card className={"max-w-[38rem] my-auto border shadow-none"}>
                <CardHeader className="gap-4 px-0 sm:px-6">
                    <CardTitle className="text-5xl font-normal">Add user</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full flex flex-col items-center justify-start gap-6 mt-4">
                        <Input type="text" placeholder="usernameRef" name="" id="" ref={usernameRef} />
                        <Input type="text" placeholder="emailRef" name="" id="" ref={emailRef} />
                        <Input type="text" placeholder="peerIdRef" name="" id="" ref={peerIdRef} />
                        <Input type="text" placeholder="imgSrcRef" name="" id="" ref={imgSrcRef} />
                    </div>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-6 mt-4">
                        <Button onClick={generateUserData}>
                            Generate Random
                        </Button>
                    </div>
                </CardContent>
            </Card>


            <Card className={"max-w-[38rem] my-auto border shadow-none"}>
                <CardHeader className="gap-4 px-0 sm:px-6">
                    <CardTitle className="text-5xl font-normal">Video calls and meetings for everyone</CardTitle>
                    <CardDescription className="text-xl w-full sm:w-10/12">
                        Connect, collaborate and celebrate from anywhere with Google Meet
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="w-full flex flex-col sm:flex-row items-center justify-start gap-6 mt-4">
                        <MeetingMenu />
                        <MeetWithCode />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <p className="text-sm">
                        <Link href={"#"} className="text-blue-500">Learn More</Link> about Google Meet
                    </p>
                </CardFooter>
            </Card>
        </main>
    )
}

export default Main;

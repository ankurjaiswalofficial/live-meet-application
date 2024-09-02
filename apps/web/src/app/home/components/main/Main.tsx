import React from "react";
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

const Main = () => {
    return (
        <main
            className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted dark:bg-background p-4 md:gap-8 md:p-10">
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

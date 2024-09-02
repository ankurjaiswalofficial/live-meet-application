import React from 'react';

import { Keyboard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";

const MeetWithCode = () => {
    return (
        <div className="flex-grow flex flex-row flex-wrap items-center justify-start gap-2">
            <div className="relative w-64">
                <Keyboard
                    className="absolute top-[50%] translate-y-[-50%] left-3 h-6 w-6 text-muted-foreground " />
                <Input
                    type="text"
                    placeholder="Enter your code or link"
                    className="text-base rounded-lg bg-background flex-grow p-6 pl-12"
                />
            </div>
            <Button variant={"ghost"}
                className="text-base gap-2 p-6 text-blue-700 hover:bg-blue-100 hover:text-blue-800">Join</Button>
        </div>
    )
}

export default MeetWithCode

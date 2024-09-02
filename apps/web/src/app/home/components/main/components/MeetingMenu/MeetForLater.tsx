"use client";
import React, { ReactNode } from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { CopyIcon, Link2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TooltipIconButton from "@/components/TooltipIconButton";

const MeetRoomIdPopUp = ({ children }: { children: ReactNode }) => {
    const handleCopyCode = () => {
        console.log("Copy Code");
    }
    return (
        <Dialog>
            {children}
            <DialogContent className="min-w-72 max-w-96">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-medium text-start">Here&apos;s your joining information</DialogTitle>
                    <DialogDescription className="text-base py-2 font-normal text-start">
                        Send this to people that you wnt to meet with. Make sure that you save it so that you can use it later, too.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <div className="flex-grow flex flex-row flex-wrap items-center justify-start gap-2">
                        <div className="relative w-full">
                            <div className="text-sm sm:text-base rounded-lg bg-background flex-grow p-4 pr-12 bg-gray-200">
                                {"localhost:3000/asd-asd-asd"}
                            </div>
                            <TooltipIconButton title="Copy code" className="absolute top-[50%] translate-y-[-50%] right-3 text-muted-foreground hover:text-white" ghost onClick={handleCopyCode}>
                                <CopyIcon className="h-5 w-5" />
                            </TooltipIconButton>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

const MeetForLater = () => {
    return (
        <DialogTrigger asChild>
            <DropdownMenuItem className={"p-4 font-medium flex cursor-pointer"}><Link2 className="h-6 w-6 mr-4" />Create a meeting for later</DropdownMenuItem>
        </DialogTrigger>
    )
}

export { MeetRoomIdPopUp };
export default MeetForLater;

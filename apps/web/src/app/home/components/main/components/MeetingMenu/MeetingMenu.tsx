import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MeetForLater, { MeetRoomIdPopUp } from "./MeetForLater";
import MeetInstant from "./MeetInstant";
import CalendarMeet from "./CalendarMeet";
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react";

const MeetingMenu = () => {
    return (
        <MeetRoomIdPopUp>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="text-base gap-2 p-6 px-5 bg-blue-600 text-white hover:bg-blue-700">
                        <Video className="h-6 w-6" />
                        New Meeting
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"left-10"}>
                    <MeetForLater />
                    <MeetInstant />
                    <CalendarMeet />
                </DropdownMenuContent>
            </DropdownMenu>
        </MeetRoomIdPopUp>
    )
}

export default MeetingMenu;

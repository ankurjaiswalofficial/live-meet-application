import React from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Calendar } from "lucide-react";

const CalendarMeet = () => {
    return (
        <DropdownMenuItem className={"p-4 font-medium flex cursor-pointer"}><Calendar className="h-6 w-6 mr-4" />Schedule in Google Calendar</DropdownMenuItem>
    )
}

export default CalendarMeet;

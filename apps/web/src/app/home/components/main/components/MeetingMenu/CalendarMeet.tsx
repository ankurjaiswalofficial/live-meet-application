import React from "react";
import { Calendar } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const CalendarMeet = () => {
    return (
        <DropdownMenuItem className={"p-4 font-medium flex cursor-pointer"}>
            <Button
                variant={"ghost"}
                className="p-0 m-0 w-full h-full bg-transparent hover:bg-transparent justify-start"
            >
                <Calendar className="h-6 w-6 mr-4" />
                Schedule in Google Calendar
            </Button>
        </DropdownMenuItem>
    );
};

export default CalendarMeet;

"use client";
import React from "react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { generateInstantMeet } from "@/redux/slices/socketSlice";

const MeetInstant = () => {
    const dispatch = useAppDispatch();

    const handleInstantMeet = () => {
        dispatch(generateInstantMeet());
    }

    return (
        <DropdownMenuItem className={"p-4 font-medium flex cursor-pointer"} onClick={handleInstantMeet}><Plus className="h-6 w-6 mr-4" />Start an instant meeting</DropdownMenuItem>
    )
}

export default MeetInstant;

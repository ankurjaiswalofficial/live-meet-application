"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { generateCustomUUID } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { meetSliceActions } from "@/redux/slices/meetSlice";

const MeetInstant = () => {
    // const [meetId, setMeetId] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleInstantMeet = () => {
        const _meetId: string = generateCustomUUID();
        // setMeetId(_meetId);
        dispatch(meetSliceActions.setMeetId(_meetId));
        // router.push("/" + String(_meetId));
        router.push("/meet");
    };

    return (
        <DropdownMenuItem className={"p-4 font-medium flex cursor-pointer"}>
            <Button
                variant={"ghost"}
                className="p-0 m-0 w-full h-full bg-transparent hover:bg-transparent justify-start"
                onClick={handleInstantMeet}
            >
                <Plus className="h-6 w-6 mr-4" />
                Start an instant meeting
            </Button>
        </DropdownMenuItem>
    );
};

export default MeetInstant;

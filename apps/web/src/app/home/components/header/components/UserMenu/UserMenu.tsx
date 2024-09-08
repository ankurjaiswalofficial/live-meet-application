"use client";
import React from "react";

import Feedback from "./components/Feedback";
import Settings from "./components/Settings";
import Logout from "./components/Logout";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipArrow } from "@radix-ui/react-tooltip"
import { generateFallbackText } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const UserMenu = () => {
    const userData = useSelector((state: RootState) => state.userHandler.userData)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Avatar>
                                <AvatarImage src={userData?.imgSrc ?? undefined} alt={userData?.email ?? undefined} />
                                <AvatarFallback>{generateFallbackText(userData?.username ?? undefined)}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="flex flex-col items-start justify-start font-medium">
                                <p className="font-bold">User Account</p>
                                <p className="">{userData?.username}</p>
                                <p className="">{userData?.email}</p>
                            </div>
                            <TooltipArrow />
                        </TooltipContent>
                    </Tooltip>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userData?.username} <br /> {userData?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Feedback />
                <Settings />
                <Logout />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu;

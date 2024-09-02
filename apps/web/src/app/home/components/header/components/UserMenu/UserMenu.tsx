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


const UserMenu = () => {
    const userData = {
        name: "Ankur Jaiswal",
        email: "ankurjaiswalofficial@gmail.com",
        imgSrc: "",
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Avatar>
                                <AvatarImage src={userData.imgSrc} alt={userData.email} />
                                <AvatarFallback>{generateFallbackText(userData.name)}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="flex flex-col items-start justify-start font-medium">
                                <p className="font-bold">User Account</p>
                                <p className="">{userData.name}</p>
                                <p className="">{userData.email}</p>
                            </div>
                            <TooltipArrow />
                        </TooltipContent>
                    </Tooltip>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userData.name} <br /> {userData.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Feedback />
                <Settings />
                <Logout />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserMenu;

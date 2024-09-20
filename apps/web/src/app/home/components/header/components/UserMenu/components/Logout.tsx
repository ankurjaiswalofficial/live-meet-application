import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { signOut } from "next-auth/react";


const Logout = () => {
    const handleLogout = () => {
        signOut();
    }

    return (
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
    )
}

export default Logout;

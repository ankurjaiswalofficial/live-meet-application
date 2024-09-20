import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";


const Logout = () => {
    const router = useRouter();
    const handleLogout = () => {
        signOut();
        router.push("/api/auth/signin");
        router.refresh();
    }

    return (
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
    )
}

export default Logout;

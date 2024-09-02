import { Video } from "lucide-react";
import Link from "next/link";
import React from "react";


const Branding = () => {
    return (
        <nav className="flex items-center justify-start">
            <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold md:text-base "
            >
                <div className="w-fit h-ful flex flex-row items-center justify-start gap-1.5">
                    <Video className="h-10 w-10 stroke-1 fill-green-500" />
                    <span className="text-lg font-medium text-nowrap">Google Meet</span>
                </div>
                <span className="sr-only">Google Meet</span>
            </Link>
        </nav>
    )
}

export default Branding;

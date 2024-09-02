import React from "react";

import DateTime from "./components/DateTime";
import ReportProblem from "./components/ReportProblem";
import Branding from "./components/Branding";
import Settings from "./components/Settings";
import UserMenu from "./components/UserMenu/UserMenu";


const Header = () => {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <Branding/>
            <div className="flex w-full items-center justify-end gap-4 ml-auto text-black">
                <DateTime/>
                <ReportProblem/>
                <Settings/>
                <UserMenu />
            </div>
        </header>
    )
}

export default Header;

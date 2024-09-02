import TooltipIconButton from "@/components/TooltipIconButton";
import { SettingsIcon } from "lucide-react";
import React from "react";


const Settings = () => {
    return (
        <TooltipIconButton title={"Settings"}>
            <SettingsIcon className="h-5 w-5" />
        </TooltipIconButton>
    )
}

export default Settings;

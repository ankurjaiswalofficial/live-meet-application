import TooltipIconButton from "@/components/TooltipIconButton";
import { MessageSquareWarning } from "lucide-react";
import React from "react";

const ReportProblem = () => {
    return (
        <TooltipIconButton title={"Report a problem"}>
            <MessageSquareWarning className="h-5 w-5" /> 
        </TooltipIconButton>
    )
}

export default ReportProblem;

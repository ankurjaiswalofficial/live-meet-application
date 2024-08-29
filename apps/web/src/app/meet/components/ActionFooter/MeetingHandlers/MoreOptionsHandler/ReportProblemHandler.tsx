import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { MessageSquareWarningIcon } from 'lucide-react'
import React from 'react'

export default function ReportProblemHandler() {
    return (
        <DropdownMenuItem className={"h-12"}>
            <div className="w-full flex flex-row items-center justify-start">
                <MessageSquareWarningIcon className="w-6 h-6 mr-2" />
                <div className="flex flex-col items-start justify-center">
                    <p>Report a problem</p>
                </div>
            </div>
        </DropdownMenuItem>
    )
}

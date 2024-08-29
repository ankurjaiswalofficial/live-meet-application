import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { BadgeInfo } from 'lucide-react'
import React from 'react'

export default function ReportAbuseHandler() {
    return (
        <DropdownMenuItem className={"h-12"}>
            <div className="w-full flex flex-row items-center justify-start">
                <BadgeInfo className="w-6 h-6 mr-2 rotate-180" />
                <div className="flex flex-col items-start justify-center">
                    <p>Report abuse</p>
                </div>
            </div>
        </DropdownMenuItem>
    )
}

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { CircleDot } from 'lucide-react'
import React from 'react'

export default function RecordingHandler() {
    return (
        <DropdownMenuItem disabled className={"h-12"}>
            <div className="w-full flex flex-row items-center justify-start">
                <CircleDot className="w-6 h-6 mr-2" />
                <div className="flex flex-col items-start justify-center">
                    <p>Recording Unavailable</p>
                    <p className="text-xs">
                        You&apos;re not allowed to record this video call
                    </p>
                </div>
            </div>
        </DropdownMenuItem>
    )
}

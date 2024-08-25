import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { LayoutDashboardIcon } from 'lucide-react'
import React from 'react'

export default function ChangeLayoutHandler() {
    return (
        <DropdownMenuItem className={"h-12"}>
            <div className="w-full flex flex-row items-center justify-start">
                <LayoutDashboardIcon className="w-6 h-6 mr-2" />
                <div className="flex flex-col items-start justify-center">
                    <p>Change Layout</p>
                </div>
            </div>
        </DropdownMenuItem>
    )
}

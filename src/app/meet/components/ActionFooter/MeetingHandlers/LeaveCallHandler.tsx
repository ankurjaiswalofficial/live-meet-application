import TooltipIconButton from '@/components/TooltipIconButton'
import { Phone } from 'lucide-react'
import React from 'react'

export default function LeaveCallHandler() {
    
    return (
        <TooltipIconButton
            title="Leave call"
            className="hidden sm:flex w-14"
            required
        >
            <Phone className="h-5 w-5 rotate-[135deg] fill-white" />
        </TooltipIconButton>
    )
}

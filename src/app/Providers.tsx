import { TooltipProvider } from '@/components/ui/tooltip'
import React, { ReactNode } from 'react'

export default function Providers({
    children,
}: Readonly<{ children: ReactNode }>) {

    return (
        <TooltipProvider delayDuration={50}>
                {children}
        </TooltipProvider>
    )
}

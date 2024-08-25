import { TooltipProvider } from '@/components/ui/tooltip'
import React, { ReactNode } from 'react'
import FullscreenProvider from './providers/FullscreenProvider'

export default function Providers({
    children,
}: Readonly<{ children: ReactNode }>) {

    return (
        <TooltipProvider delayDuration={50}>
            <FullscreenProvider>
                {children}
            </FullscreenProvider>
        </TooltipProvider>
    )
}

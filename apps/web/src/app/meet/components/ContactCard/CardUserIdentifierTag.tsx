import TinyIconTag from '@/components/TinyIconTag'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { PinIcon } from 'lucide-react';
import React from 'react'

interface CardUserIdentifierTagProps {
    className?: string;
    pin?: boolean;
    username: string;
}

export default function CardUserIdentifierTag({ className, pin, username }: Readonly<CardUserIdentifierTagProps>) {
    const [pinned,] = React.useState(pin ?? false);
    return (
        <div className={cn("absolute bottom-2 left-2 flex items-center gap-2", className)}>
            <TinyIconTag className="" activeHandler={pinned} ActiveIcon={PinIcon} FallbackIcon={null} show={pinned} />
            <Tooltip>
                <TooltipTrigger>
                    <p className="text-sm text-white text-nowrap max-w-36 overflow-hidden text-ellipsis h-8 text-center flex items-center">{username}</p>
                </TooltipTrigger>
                <TooltipContent className='p-1 px-1.5'>
                    {username}
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

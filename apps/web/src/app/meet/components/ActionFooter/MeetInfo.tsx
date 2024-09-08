"use client";
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import useMeetInfo from '@/hooks/useMeetInfo';
import useDateTime from '@/hooks/useDateTime';

export default function MeetInfo() {
    const [isClient, setIsClient] = useState(false);
    const { meetId } = useMeetInfo();
    const { currentTime, updateTime } = useDateTime();

    React.useEffect(() => {
        setIsClient(true);
        updateTime();
    }, [updateTime]);

    return (
        <div className="h-full items-center justify-start gap-2 hidden sm:flex">
            <div className="h-fit flex items-center justify-start space-x-2 px-4 text-base font-semibold">
                <p className="hidden xl:block text-base">{isClient && currentTime}</p>
                {isClient && <Separator
                    orientation="vertical"
                    className="pr-0.5 h-5 bg-muted hidden xl:block"
                />}
                <p className='text-base text-nowrap min-w-12 max-w-28 overflow-hidden text-ellipsis'>{meetId}</p>
            </div>
        </div>
    )
}

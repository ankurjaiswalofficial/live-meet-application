"use client";
import React, { useState } from 'react'
import useDateTime from '@/hooks/useDateTime';

const DateTime = () => {
    const [isClient, setIsClient] = useState(false);
    const { currentDate, currentTime, updateDateTime } = useDateTime();

    React.useEffect(() => {
        setIsClient(true);
        updateDateTime();
    }, [updateDateTime]);

    return (
        <div className="hidden sm:block text-base font-normal">
            {isClient && currentTime} • {isClient && currentDate}
        </div>
    )
}

export default DateTime;

import { Separator } from '@/components/ui/separator'
import dayjs from 'dayjs';
import React from 'react'

interface MeetInfoProps {
    meetingCode: string;
}

export default function MeetInfo({ meetingCode }: Readonly<MeetInfoProps>) {
    const [currentTime, setCurrentTime] = React.useState(dayjs());

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(dayjs());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="h-full items-center justify-start gap-2 hidden sm:flex">
            <div className="h-fit flex items-center justify-start space-x-2 px-4 text-base font-semibold">
                <p className="hidden xl:block text-base">{currentTime.format("HH:mm")}</p>
                <Separator
                    orientation="vertical"
                    className="pr-0.5 h-5 bg-muted hidden xl:block"
                />
                <p className='text-base text-nowrap min-w-12 max-w-28 overflow-hidden text-ellipsis'>{meetingCode}</p>
            </div>
        </div>
    )
}

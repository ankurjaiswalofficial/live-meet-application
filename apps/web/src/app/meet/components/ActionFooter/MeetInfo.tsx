"use client";
import {RootState} from '@/redux/store';
import {Separator} from '@/components/ui/separator'
import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {useAppDispatch} from "@/redux/hooks";
import {timeSliceActions, updateTime} from "@/redux/slices/timeSlice";

interface MeetInfoProps {
    meetingCode: string;
}

export default function MeetInfo({meetingCode}: Readonly<MeetInfoProps>) {
    const [isClient, setIsClient] = useState(false);
    const currentTime = useSelector((state: RootState) => state.timeHandler.currentTime)
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        setIsClient(true);
        dispatch(updateTime());
    }, [dispatch]);

    return (
        <div className="h-full items-center justify-start gap-2 hidden sm:flex">
            <div className="h-fit flex items-center justify-start space-x-2 px-4 text-base font-semibold">
                <p className="hidden xl:block text-base">{isClient && currentTime}</p>
                {isClient && <Separator
                    orientation="vertical"
                    className="pr-0.5 h-5 bg-muted hidden xl:block"
                />}
                <p className='text-base text-nowrap min-w-12 max-w-28 overflow-hidden text-ellipsis'>{meetingCode}</p>
            </div>
        </div>
    )
}

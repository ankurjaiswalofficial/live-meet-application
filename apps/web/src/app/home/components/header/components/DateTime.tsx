"use client";
import { RootState } from '@/redux/store';
import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { updateDate, updateTime } from "@/redux/slices/timeSlice";

const DateTime = () => {
    const [isClient, setIsClient] = useState(false);

    const currentDateTime = useSelector((state: RootState) => state.timeHandler)
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        setIsClient(true);
        dispatch(updateTime());
        dispatch(updateDate());
    }, [dispatch]);

    return (
        <div className="hidden sm:block text-base font-normal">
            {isClient && currentDateTime.currentTime} • {isClient && currentDateTime.currentDate}
        </div>
    )
}

export default DateTime;

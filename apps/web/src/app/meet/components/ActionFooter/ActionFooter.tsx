import React from 'react'
import MeetInfo from './MeetInfo'
import ControlHandlers from './ControlHandlers'
import MeetingHandlers from './MeetingHandlers/MeetingHandlers'

export default function ActionFooter() {
    return (
        <div className="flex flex-row items-center justify-between w-full min-h-18 h-20">
            <MeetInfo meetingCode='asd-dfg-fgh' />
            <MeetingHandlers />
            <ControlHandlers />
        </div>
    )
}

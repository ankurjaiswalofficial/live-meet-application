import React from 'react'
import AudioHandler from './AudioHandler'
import VideoHandler from './VideoHandler'
import EmojiHandler from './EmojiHandler'
import ScreenPresentationHandler from './ScreenPresentationHandler'
import RaiseHandHandler from './RaiseHandHandler'
import LeaveCallHandler from './LeaveCallHandler'
import MoreOptionsHandler from './MoreOptionsHandler/MoreOptionsHandler'

export default function MeetingHandlers() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex items-center justify-center gap-3">
        <AudioHandler />
        <VideoHandler />
        <EmojiHandler />
        <ScreenPresentationHandler />
        <RaiseHandHandler />
        <MoreOptionsHandler />
        <LeaveCallHandler />
      </div>
    </div>
  )
}

import React from 'react'
import RecordingHandler from './RecordingHandler'
import ChangeLayoutHandler from './ChangeLayoutHandler'
import TooltipIconButton from '@/components/TooltipIconButton'
import { MoreVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import FullscreenHandler from './FullscreenHandler'
import ReportProblemHandler from './ReportProblemHandler'
import SettingsHandler from './SettingsHandler'
import ReportAbuseHandler from './ReportAbuseHandler'

export default function MoreOptionsHandler() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <TooltipIconButton
            title="More options"
            className="hidden sm:flex"
          >
            <MoreVertical className="h-5 w-5" />
          </TooltipIconButton>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-80 text-neutral-600">
        <RecordingHandler />
        <DropdownMenuSeparator />
        <ChangeLayoutHandler />
        <FullscreenHandler />
        <DropdownMenuSeparator />
        <ReportProblemHandler />
        <ReportAbuseHandler />
        <SettingsHandler />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

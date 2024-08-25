import TooltipIconButton from '@/components/TooltipIconButton'
import { ArrowUpSquare } from 'lucide-react'
import React from 'react'

export default function ScreenPresentationHandler() {
  const [screenPresentActive, setScreenPresentActive] = React.useState(false);
    const handleScreenPresentActive = () => {
      setScreenPresentActive(!screenPresentActive)
    }
  return (
    <TooltipIconButton
          title="Present now"
          className="hidden sm:flex"
          active={screenPresentActive}
          onClick={handleScreenPresentActive}
        >
          <ArrowUpSquare className="h-5 w-5" />
        </TooltipIconButton>
  )
}

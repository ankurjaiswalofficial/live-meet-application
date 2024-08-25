import TooltipIconButton from '@/components/TooltipIconButton'
import { Hand } from 'lucide-react'
import React from 'react'

export default function RaiseHandHandler() {
    const [raiseHandActive, setRaiseHandActive] = React.useState(false);
    const handleRaiseHandActive = () => {
        setRaiseHandActive(!raiseHandActive)
    }
    return (
        <TooltipIconButton
            title="Raise Hand"
            className="hidden sm:flex"
            active={raiseHandActive}
            onClick={handleRaiseHandActive}
        >
            <Hand className="h-5 w-5" />
        </TooltipIconButton>
    )
}

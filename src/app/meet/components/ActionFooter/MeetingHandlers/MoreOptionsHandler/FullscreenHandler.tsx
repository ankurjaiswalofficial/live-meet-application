import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Fullscreen } from 'lucide-react'
import React from 'react'

export default function FullscreenHandler() {
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const handleIsFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }
    return (
        <DropdownMenuItem className={"h-12"} onClick={handleIsFullscreen}>
            <div className="w-full flex flex-row items-center justify-start">
                <Fullscreen className="w-6 h-6 mr-2" />
                <div className="flex flex-col items-start justify-center">
                    {isFullscreen ? <p>Exit Full Screen</p> : <p>Full Screen</p>}
                </div>
            </div>
        </DropdownMenuItem>
    )
}

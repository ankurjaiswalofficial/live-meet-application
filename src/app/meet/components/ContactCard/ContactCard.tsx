import React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import TooltipIconButton from '@/components/TooltipIconButton'
import { Mic, MicOff, PinOff } from 'lucide-react'
import TinyIconTag from '@/components/TinyIconTag'
import CardAvatar from './CardAvatar'
import CardUserIdentifierTag from './CardUserIdentifierTag'
import CardMediaHandler from './CardMediaHandler'


export default function ContactCard() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [videoActive, setVideoActive] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);
  const [audioActive, setAudioActive] = React.useState(false);
  return (
    <Card
      className="relative flex items-center justify-center rounded-lg bg-neutral-900 border-neutral-800 overflow-hidden min-w-80 min-h-44 w-full h-full"
    >
      <CardAvatar activeHandler={videoActive} fallbackText="Ankur Jaiswal" imgSrc="https://github.com/shadcn.png" />
      <CardMediaHandler audioRef={audioRef} videoRef={videoRef} />
      <TinyIconTag className="" ActiveIcon={Mic} FallbackIcon={MicOff} activeHandler={audioActive} absoluted />
      <CardUserIdentifierTag username="Ankur Jaiswal" pin={true} />
    </Card>
  )
}

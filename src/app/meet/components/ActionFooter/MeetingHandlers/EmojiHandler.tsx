import TooltipIconButton from '@/components/TooltipIconButton'
import { Smile } from 'lucide-react'
import React from 'react'

export default function EmojiHandler() {
  const [emojiActive, setEmojiActive] = React.useState(false);
  const handleEmojiActive = () => {
    setEmojiActive(!emojiActive)
  }
  return (
    <TooltipIconButton
      title="Send a reaction"
      className="hidden sm:flex"
      active={emojiActive}
      onClick={handleEmojiActive}
    >
      <Smile className="h-5 w-5" />
    </TooltipIconButton>
  )
}

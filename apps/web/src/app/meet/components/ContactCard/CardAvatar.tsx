import React from 'react'
import { cn, generateFallbackText } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface CardAvatarProps { activeHandler?: boolean, imgSrc?: string, fallbackText?: string }

export default function CardAvatar({ activeHandler, imgSrc, fallbackText }: Readonly<CardAvatarProps>) {
    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full flex items-center justify-center bg-transparent">
            <Avatar className={cn("w-1/3 max-w-40 h-auto shadow-md aspect-square", { "hidden": activeHandler })}>
                {imgSrc && <AvatarImage
                    src={imgSrc}
                    alt={fallbackText}
                />}
                <AvatarFallback className='w-full h-full'>{generateFallbackText(fallbackText)}</AvatarFallback>
            </Avatar>
        </div>
    )
}

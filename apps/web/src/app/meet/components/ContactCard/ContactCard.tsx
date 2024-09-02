"use client";
import React from 'react'
import {Card} from '@/components/ui/card'
import {Mic, MicOff} from 'lucide-react'
import TinyIconTag from '@/components/TinyIconTag'
import CardAvatar from './CardAvatar'
import CardUserIdentifierTag from './CardUserIdentifierTag'
import CardMediaHandler from './CardMediaHandler/CardMediaHandler'
import {useSelector} from "react-redux";
import {RootState} from '@/redux/store'


export default function ContactCard() {
    const audioActive: boolean = useSelector((state: RootState) => state.audioHandler.isActive);
    const videoActive: boolean = useSelector((state: RootState) => state.videoHandler.isActive);


    return (
        <Card
            className="relative flex items-center justify-center rounded-lg bg-neutral-900 border-neutral-800 overflow-hidden min-w-80 min-h-44 w-full h-full"
        >
            <CardAvatar activeHandler={videoActive} fallbackText="Ankur Jaiswal"
                        imgSrc="https://github.com/shadcn.png"/>
            <CardMediaHandler />
            <TinyIconTag className="" ActiveIcon={Mic} FallbackIcon={MicOff}
                         activeHandler={audioActive} absoluted/>
            <CardUserIdentifierTag username="Ankur Jaiswal" pin={true}/>
        </Card>
    )
}

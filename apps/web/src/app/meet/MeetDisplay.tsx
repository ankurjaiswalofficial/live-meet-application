import React from 'react'
import ContactCard from './components/ContactCard/ContactCard'

export default function MeetDisplay() {
    return (
        <div className="relative p-4 w-full grid grid-flow-col grid-cols-1 h-[calc(100vh_-_5rem)] gap-2">
            {[1].map((_, index) => (
                <ContactCard key={index} />
            ))}
            <div className="absolute bottom-4 right-4">
                {/*<ContactCard />*/}
            </div>
        </div>
    )
}

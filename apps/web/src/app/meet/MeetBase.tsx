import React from 'react'

export default function MeetBase({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="bg-neutral-900 text-white flex flex-col items-center justify-center min-h-screen w-screen">
            {children}
        </div>
    )
}

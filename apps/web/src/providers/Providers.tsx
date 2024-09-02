"use client";
import { TooltipProvider } from '@/components/ui/tooltip'
import React, { ReactNode } from 'react'
import { AudioContextProvider } from "@/context/audioContext";
import { VideoContextProvider } from "@/context/videoContext";
import store from '@/redux/store';
import { Provider } from 'react-redux';
import UserContextProvider from '@/context/userContext';


export default function Providers({ children }: Readonly<{ children: ReactNode }>) {

    return (
        <Provider store={store}>
            <TooltipProvider delayDuration={50}>
                <UserContextProvider>
                    <VideoContextProvider>
                        <AudioContextProvider>

                            {children}

                        </AudioContextProvider>
                    </VideoContextProvider>
                </UserContextProvider>
            </TooltipProvider>
        </Provider>
    )
}

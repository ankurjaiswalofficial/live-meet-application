"use client";
import { TooltipProvider } from '@/components/ui/tooltip'
import React, { ReactNode } from 'react'
import store from '@/redux/store';
import { Provider } from 'react-redux';
import { MediaContextProvider } from '@/context/mediaContext';


export default function Providers({ children }: Readonly<{ children: ReactNode }>) {

    return (
        <Provider store={store}>
            <TooltipProvider delayDuration={50}>
                <MediaContextProvider>
                    {children}
                </MediaContextProvider>
            </TooltipProvider>
        </Provider>
    )
}

"use client";
import React from 'react';
import ActionFooter from "./components/ActionFooter/ActionFooter";
import MeetBase from "./MeetBase";
import MeetDisplay from "./MeetDisplay";
import { SocketContextProvider } from '@/context/socketContext';
import { RemoteContextProvider } from '@/context/remoteContext';

function Meet() {
    return (
        <RemoteContextProvider>
            <SocketContextProvider>
                <MeetBase>
                    <MeetDisplay />
                    <ActionFooter />
                </MeetBase>
            </SocketContextProvider>
        </RemoteContextProvider>
    );
}

export default Meet;

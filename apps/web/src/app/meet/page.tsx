"use client";
import React from 'react';
import ActionFooter from "./components/ActionFooter/ActionFooter";
import MeetBase from "./MeetBase";
import MeetDisplay from "./MeetDisplay";
import { SocketContextProvider } from '@/context/socketContext';

function Meet() {
    return (
        <SocketContextProvider>
            <MeetBase>
                <MeetDisplay />
                <ActionFooter />
            </MeetBase>
        </SocketContextProvider>
    );
}

export default Meet;

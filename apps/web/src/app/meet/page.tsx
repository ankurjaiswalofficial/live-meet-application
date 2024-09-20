"use client";
import React, { useEffect } from 'react';
import ActionFooter from "./components/ActionFooter/ActionFooter";
import MeetBase from "./MeetBase";
import MeetDisplay from "./MeetDisplay";
import { RemoteContextProvider } from '@/context/remoteContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SocketContextProvider from '@/context/socketContext';
// import PeerContextProvider from '@/context/peerContext';

function Meet() {
    const meetDetails = useSelector((state: RootState) => state.meetHandler.meetId);
    useEffect(() => {
        console.log(meetDetails);
    }, [meetDetails])
    return (
        <SocketContextProvider>
            {/* <PeerContextProvider> */}
                <RemoteContextProvider>
                    <MeetBase>
                        <MeetDisplay />
                        <ActionFooter />
                    </MeetBase>
                </RemoteContextProvider>
            {/* </PeerContextProvider> */}
        </SocketContextProvider>
    );
}

export default Meet;

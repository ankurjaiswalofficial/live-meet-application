"use client";
import React from 'react';
import ActionFooter from "./components/ActionFooter/ActionFooter";
import MeetBase from "./MeetBase";
import MeetDisplay from "./MeetDisplay";
import { Provider } from 'react-redux';
import store from '../redux/store';

function Meet() {
    return (
        <Provider store={store}>
            <MeetBase>
                <MeetDisplay />
                <ActionFooter />
            </MeetBase>
        </Provider>
    );
}

export default Meet;

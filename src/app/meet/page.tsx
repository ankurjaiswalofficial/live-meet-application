"use client";
import React from 'react';
import ActionFooter from "./components/ActionFooter/ActionFooter";
import MeetBase from "./MeetBase";
import MeetDisplay from "./MeetDisplay";
import { Provider } from 'react-redux';
import store from '../redux/store';

function Meet() {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [videoActive, setVideoActive] = React.useState(false);
    const [audioActive, setAudioActive] = React.useState(false);
    const handleVideoActive = React.useCallback(async () => {
        if (videoActive) {
            if (videoRef.current && videoRef.current.srcObject) {
                const videoStream = videoRef.current.srcObject as MediaStream;
                const videoTracks = videoStream.getTracks();
                videoTracks.forEach((track) => track.stop());
            }
            setVideoActive(false);
        } else {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    setVideoActive(true);
                }
            } catch (error) {
                console.error("Error accessing video media device:", error);
            }
        }
    }, [videoActive]);

    const handleAudioActive = React.useCallback(async () => {
        if (audioActive) {
            if (audioRef.current && audioRef.current.srcObject) {
                const audioStream = audioRef.current.srcObject as MediaStream;
                const audioTracks = audioStream.getTracks();
                audioTracks.forEach((track) => track.stop());
            }
            setAudioActive(false);
        } else {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });
                if (audioRef.current) {
                    audioRef.current.srcObject = mediaStream;
                    audioRef.current.play();
                    setAudioActive(true);
                }
            } catch (error) {
                console.error("Error accessing video media device:", error);
            }
        }
    }, [audioActive]);

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

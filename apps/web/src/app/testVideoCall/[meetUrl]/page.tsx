"use client";
import React, { useState, useRef, useEffect } from 'react';

interface CameraMicCaptureProps {}

const CameraMicCapture: React.FC<CameraMicCaptureProps> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isCapturing, setIsCapturing] = useState(false);

    const startCapture = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                videoRef.current.play();
            }

            if (audioRef.current) {
                audioRef.current.srcObject = mediaStream;
                audioRef.current.play();
            }

            setIsCapturing(true);
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    };

    const stopCapture = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const videoStream = videoRef.current.srcObject as MediaStream;
            const videoTracks = videoStream.getTracks();
            videoTracks.forEach((track) => track.stop());
        }

        if (audioRef.current && audioRef.current.srcObject) {
            const audioStream = audioRef.current.srcObject as MediaStream;
            const audioTracks = audioStream.getTracks();
            audioTracks.forEach((track) => track.stop());
        }

        setIsCapturing(false);
    };

    return (
        <div className='w-full h-full'>
            <video ref={videoRef} autoPlay className='w-full'></video>
            <audio ref={audioRef} autoPlay></audio>
            <button onClick={isCapturing ? stopCapture : startCapture}>
                {isCapturing ? 'Stop Capture' : 'Start Capture'}
            </button>
        </div>
    );
};

export default CameraMicCapture;

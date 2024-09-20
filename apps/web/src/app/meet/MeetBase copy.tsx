"use client";
import useMeetInfo from '@/hooks/useMeetInfo';
import useMedia from '@/hooks/useMedia';
import usePeer from '@/hooks/usePeer';
import { useSocket } from '@/hooks/useSocket'
import useUser from '@/hooks/useUser';
import React, { useCallback, useEffect } from 'react'
import useMediaStatus from '@/hooks/useMediaStatus';
import useRemote from '@/hooks/useRemote';

export default function MeetBase({ children }: Readonly<{ children: React.ReactNode }>) {
    const { meetId } = useMeetInfo();
    const { userData } = useUser();
    const { socket } = useSocket();
    const { pc, createOffer, createAnswer, setAnswer, setIceCandidate, } = usePeer();
    const { audioStream, videoStream } = useMedia();
    const { audioActive, videoActive } = useMediaStatus();
    const { remoteContent, setRemoteContent } = useRemote();

    const handleOffer = useCallback(async () => {
        const offer = await createOffer();
        pc.setLocalDescription(offer);
        socket.emit("offer", { meetId, userData, offer });
        console.log("Sent offer", userData?.peerId);
    }, [createOffer, meetId, pc, socket, userData])

    const initPeerConnection = useCallback(() => {
        pc.onicecandidate = (ev: RTCPeerConnectionIceEvent) => {
            if (ev.candidate) {
                socket.emit("candidate", { meetId, userData, candidate: ev.candidate });
                // console.log("Candidate found: ", ev.candidate, "for user: ", userData?.peerId);
            }
        }

        pc.onconnectionstatechange = (ev: Event) => {
            if ((ev.target as RTCPeerConnection).connectionState === "connected") {
                console.log("Connection State Changed CONNECTED")
            }
        }

        pc.oniceconnectionstatechange = (ev: Event) => {
            const state = (ev.target as RTCPeerConnection).iceConnectionState;
            if (state === "failed") {
                (ev.target as RTCPeerConnection).restartIce();
                console.log("ICE connection failed, attempting to restart.");
            } else {
                console.log("ICE connection state changed: ", state);
            }
        }

        pc.onicecandidateerror = (ev: RTCPeerConnectionIceErrorEvent) => {
            console.log("Ice Candidate Error: ", ev.errorText);
        }

        pc.onnegotiationneeded = async (ev: Event) => {
            handleOffer();
            console.log("On negotiation needed")
        }

        pc.ontrack = (ev: RTCTrackEvent) => {
            console.log("OnTrack Called")
            const stream = ev.streams[0];
            const _peerId = Object.keys(remoteContent)[0]
            const remoteAudioStream = new MediaStream();
            const remoteVideoStream = new MediaStream();
            if (stream.getVideoTracks().length > 0) {
                stream.getVideoTracks().forEach((track) => {
                    remoteVideoStream.addTrack(track);
                })
            }
            if (stream.getAudioTracks().length > 0) {
                stream.getAudioTracks().forEach((track) => {
                    remoteAudioStream.addTrack(track);
                })
            }
            setRemoteContent({
                _peerId: {
                    ...remoteContent[_peerId],
                    audioStream: remoteAudioStream,
                    videoStream: remoteVideoStream,
                }
            })
            console.log(remoteContent);
        }
        // return () => {
        //     pc.close()
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pc])


    // useEffect(() => {
    //     console.log("videoStream", videoStream)
    //     if (videoStream) {
    //         try {
    //             videoStream.getVideoTracks().forEach((track) => pc.addTrack(track, videoStream))
    //         } catch (e) {
    //             // pc.removeTrack();
    //             console.log("Video Track Removal Required...")
    //         }
    //     }
    // }, [pc, videoStream])


    useEffect(() => {
        socket.emit("join-meet", { meetId, userData });
        console.log("Join Meet", userData?.peerId);
        initPeerConnection();

        return () => {
            socket.close()
        }
    }, [])

    useEffect(() => {
        console.log("SELF audioStream, videoStream", audioStream, videoStream)
        if (audioStream) {
            pc.getSenders().forEach((sender) => {
                return sender.setStreams(audioStream);
            })
        }
    }, [audioStream, pc, videoStream])

    useEffect(() => {
        socket.emit("media-status", { meetId, userData, audioActive, videoActive })
        console.log("update media status", userData?.peerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioActive, videoActive])

    socket.on("send-media-status", (data) => {
        socket.emit("media-status", { meetId, userData, audioActive, videoActive });
        console.log("Send Media Status", userData?.peerId)
    })

    socket.on("new-peer", ({ meetId, userData, audioActive, videoActive }) => {
        setRemoteContent(prev => ({ ...prev, [userData.peerId]: { ...remoteContent[userData.peerId] ?? null, userData, audioActive, videoActive, } }))
        console.log("New Peer Received", userData.peerId);
    })

    socket.on("send-offer", async (data) => {
        const offer = await createOffer();
        socket.emit("offer", { ...data, offer });
        console.log("Sent offer", data.userData.peerId);
    })

    socket.on("offer", async ({ meetId, userData, offer }) => {
        const answer = await createAnswer(offer);
        socket.emit("answer", { meetId, userData, answer });
        console.log("Sent Answer", userData.peerId)
    })

    socket.on("answer", async ({ meetId, userData, answer }) => {
        setAnswer(answer);
        console.log("Answer Set", userData.peerId);
    })

    socket.on("candidate", async ({ meetId, userData, candidate }) => {
        console.log(candidate)
        await setIceCandidate(candidate);
        console.log("Candidate Set", userData.peerId);
    })

    socket.on("no-meet", (meetStatus: boolean) => {
        console.log("No Such meeting found with meet Id: ", meetId);
    })


    return (
        <div className="bg-neutral-900 text-white flex flex-col items-center justify-center min-h-screen w-screen">
            {children}
        </div>
    )
}

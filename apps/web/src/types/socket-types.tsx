import { Socket } from "socket.io-client";

interface AudioStreamInterface {
    audio: MediaStream | null;
}
interface VideoStreamInterface {
    video: MediaStream | null;
}
interface ScreenAudioStreamInterface {
    audio: MediaStream | null;
}
interface ScreenVideoStreamInterface {
    video: MediaStream | null;
}

interface BasicMediaStream extends AudioStreamInterface, VideoStreamInterface { }

interface ScreenStreamInterface extends ScreenAudioStreamInterface, ScreenVideoStreamInterface { }

interface AudioStreamInterface {
    audio: MediaStream | null;
}

interface UserDataInterface {
    peerId: string;
    name: string;
    email: string;
    imgSrc: string | URL | null;
}

interface MediaStatusInterface {
    isActive: boolean;
}

interface AudioStatusInterface {
    audioActive: boolean;
}

interface VideoStatusInterface {
    videoActive: boolean;
}

interface ScreenAudioStatusInterface {
    audioActive: boolean;
}

interface ScreenVideoStatusInterface {
    videoActive: boolean;
}

interface BasicMediaStatusInterface extends AudioStatusInterface, VideoStatusInterface { }

interface ScreenMediaStatusInterface extends ScreenAudioStatusInterface, ScreenVideoStatusInterface { }

interface MeetIdInterface {
    meetId: string;
}

interface MeetingDetailsInterface extends MeetIdInterface {
    peerCount: number;
    hostedBy: string;
}

interface BasicSocketUserDataInterface extends UserDataInterface, MeetIdInterface { }

interface BasicSocketMediaStatusInterface extends BasicMediaStatusInterface, MeetIdInterface { }

interface AdvancedSocketUserDataInterface extends BasicSocketUserDataInterface { }

interface AdvancedSocketMediaStatusInterface extends BasicSocketMediaStatusInterface, ScreenMediaStatusInterface { }


interface SocketContextType {
    socket: Socket;
}

export type { SocketContextType };

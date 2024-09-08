interface MediaStateInterface {
    isActive: boolean;
    isRecording: boolean;
    url: string | null;
    blob: Blob | null;
}

interface AllMediaStateInterface {
    audio: MediaStateInterface,
    video: MediaStateInterface,
    screenAudio: MediaStateInterface,
    screenVideo: MediaStateInterface,

}

interface AudioContextType {
    audioStream: MediaStream | null;
    setAudioStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
}
interface VideoContextType {
    videoStream: MediaStream | null;
    setVideoStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
}
interface ScreenAudioContextType {
    screenAudioStream: MediaStream | null;
    setScreenAudioStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
}
interface ScreenVideoContextType {
    screenVideoStream: MediaStream | null;
    setScreenVideoStream: React.Dispatch<React.SetStateAction<MediaStream | null>>
}

interface MediaContextType extends AudioContextType, VideoContextType, ScreenAudioContextType, ScreenVideoContextType { };

export type {
    AudioContextType,
    VideoContextType,
    ScreenAudioContextType,
    ScreenVideoContextType,
    AllMediaStateInterface,
    MediaStateInterface,
    MediaContextType
};

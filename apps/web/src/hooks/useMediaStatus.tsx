import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { audioSliceActions, toggleAudio } from "../redux/slices/audioSlice";
import { toggleVideo, videoSliceActions } from "../redux/slices/videoSlice";
import { screenSliceActions, toggleScreen } from "../redux/slices/screenSlice";
import { useAppDispatch } from "./useAppDispatch";


const useMediaStatus = () => {
    const audioActive = useSelector((state: RootState) => state.audioHandler.isActive)
    const videoActive = useSelector((state: RootState) => state.videoHandler.isActive)
    const screenActive = useSelector((state: RootState) => state.screenHandler.isActive)

    const dispatch = useAppDispatch();

    const setAudioInactive = useCallback(() => audioSliceActions.resetAudio(), [])
    const setVideoInactive = useCallback(() => videoSliceActions.resetVideo(), [])
    const setScreenInactive = useCallback(() => screenSliceActions.resetScreen(), [])

    const context = useMemo(() => {
        return { audioActive, videoActive, screenActive, setAudioInactive, setVideoInactive, setScreenInactive, toggleAudio, toggleVideo, toggleScreen }
    }, [audioActive, screenActive, setAudioInactive, setScreenInactive, setVideoInactive, videoActive]);

    return context;
};

export default useMediaStatus;

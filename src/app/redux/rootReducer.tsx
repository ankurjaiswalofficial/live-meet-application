import {combineReducers} from '@reduxjs/toolkit';
import {fullScreenReducer} from './slices/fullscreenSlice';
import {audioSliceReducer} from "@/app/redux/slices/audioSlice";
import {timeSliceReducer} from "@/app/redux/slices/timeSlice";
import {videoSliceReducer} from "@/app/redux/slices/videoSlice";

const rootReducer = combineReducers({
    timeHandler: timeSliceReducer,
    fullScreen: fullScreenReducer,
    audioHandler: audioSliceReducer,
    videoHandler: videoSliceReducer,
});

export default rootReducer;

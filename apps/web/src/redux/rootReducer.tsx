import { combineReducers } from '@reduxjs/toolkit';
import { fullScreenReducer } from '@/redux/slices/fullscreenSlice';
import { audioSliceReducer } from "@/redux/slices/audioSlice";
import { timeSliceReducer } from "@/redux/slices/timeSlice";
import { videoSliceReducer } from "@/redux/slices/videoSlice";
import { screenSliceReducer } from "@/redux/slices/screenSlice";
import { userSliceReducer } from './slices/userSlice';
import { meetSliceReducer } from './slices/meetSlice';

const rootReducer = combineReducers({
    timeHandler: timeSliceReducer,
    fullScreen: fullScreenReducer,
    audioHandler: audioSliceReducer,
    videoHandler: videoSliceReducer,
    screenHandler: screenSliceReducer,
    userHandler: userSliceReducer,
    meetHandler: meetSliceReducer,
});

export default rootReducer;

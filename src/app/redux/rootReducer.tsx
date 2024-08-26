import { combineReducers } from '@reduxjs/toolkit';
import { fullScreenReducer } from './slices/fullscreenSlice';

const rootReducer = combineReducers({
    fullScreen: fullScreenReducer,
});

export default rootReducer;

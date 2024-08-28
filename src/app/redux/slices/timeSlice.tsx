import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface TimeSliceState {
    currentTime: string;
}

const initialState: TimeSliceState = {
    currentTime: "Loading...",
};

export const updateTime = createAsyncThunk("timeSlice/updateTime", async (_, {dispatch}) => {
    setInterval(() => {
        const currentTime = dayjs().format("HH:mm");
        dispatch(timeSliceActions.setTime(currentTime));
    }, 1000);
});

const timeSlice = createSlice({
    name: "timeSlice",
    initialState,
    reducers: {
        setTime: (state, action) => {
            state.currentTime = action.payload;
        },
    },
    extraReducers: (builder) =>{
        builder.addCase(updateTime.fulfilled, (state, action) => {
            console.log("Time Slice initialized");
        })
    }
});

export const timeSliceActions = timeSlice.actions;
export const timeSliceReducer = timeSlice.reducer;

export default timeSlice;

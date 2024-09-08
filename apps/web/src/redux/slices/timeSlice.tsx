import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState: TimeSliceState = {
    currentTime: "Loading...",
    currentDate: "Loading...",
};

export const updateTime = createAsyncThunk("timeSlice/updateTime", async (_, {dispatch}) => {
    setInterval(() => {
        const currentTime = dayjs().format("HH:mm");
        dispatch(timeSliceActions.setTime(currentTime));
    }, 1000);
});
export const updateDate = createAsyncThunk("timeSlice/updateDate", async (_, {dispatch}) => {
    setInterval(() => {
        const currentDate = dayjs().format("ddd, DD MMM");
        dispatch(timeSliceActions.setDate(currentDate));
    }, 1000);
});

const timeSlice = createSlice({
    name: "timeSlice",
    initialState,
    reducers: {
        setTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDate: (state, action) => {
            state.currentDate = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateTime.fulfilled, () => {
                console.log("Time Slice initialized");
            })
            .addCase(updateDate.fulfilled, () => {
                console.log("Date Slice initialized")
            })

    }
});

export const timeSliceActions = timeSlice.actions;
export const timeSliceReducer = timeSlice.reducer;

export default timeSlice;

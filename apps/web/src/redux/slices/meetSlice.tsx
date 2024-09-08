import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface MeetState {
    meetId: string | null;
}

const initialState: MeetState = {
    meetId: "",
};

const meetSlice = createSlice({
    name: "meetSlice",
    initialState,
    reducers: {
        setMeetId: (state, action: PayloadAction<string>) => {
            state.meetId = action.payload;
        },
    },
});

export const meetSliceReducer = meetSlice.reducer;
export const meetSliceActions = meetSlice.actions;

export default meetSlice;

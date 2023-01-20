import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isOrganizer: false,
    isPlayer: false,
  },
  reducers: {
    userIsOrganizer: (state) => {
      state.isOrganizer = true;
    },
    userIsPlayer: (state) => {
      state.isPlayer = true;
    },
  },
});

export const { userIsOrganizer } = appSlice.actions;
export const { userIsPlayer } = appSlice.actions;

export const appReducer = appSlice.reducer;

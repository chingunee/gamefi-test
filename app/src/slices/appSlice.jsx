import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isOrganizer: false,
  },
  reducers: {
    userIsOrganizer: (state) => {
      state.isOrganizer = true;
    },
  },
});

export const { userIsOrganizer } = appSlice.actions;

export const appReducer = appSlice.reducer;

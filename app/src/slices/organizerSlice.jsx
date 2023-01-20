import { createSlice } from "@reduxjs/toolkit";

const organizerSlice = createSlice({
  name: "organizer",
  initialState: {
    organizerNFTAddress: "",
  },
  reducers: {
    setOrganizerNFT: (state, payload) => {
      state.organizerNFTAddress = payload;
    },
  },
});

export const modalReducer = organizerSlice.reducer;

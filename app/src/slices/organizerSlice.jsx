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

export const { showConnectWalletModal, hideConnectWalletModal } =
  organizerSlice.actions;

export const modalReducer = organizerSlice.reducer;

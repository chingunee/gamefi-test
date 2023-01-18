import { createSlice } from "@reduxjs/toolkit";

const ALERT_DEFAULT_DATA = {
  content: "",
};

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    defaultConfig: {
      timer: 4000,
      showConfirmButton: false,
      timerProgressBar: true,
    },

    showSuccessAlert: false,
    showErrorAlert: false,
    showWarningAlert: false,
    showInfoAlert: false,

    successAlertData: ALERT_DEFAULT_DATA,
    errorAlertData: ALERT_DEFAULT_DATA,
    warningAlertData: ALERT_DEFAULT_DATA,
    infoAlertData: ALERT_DEFAULT_DATA,
  },
  reducers: {
    triggerSuccessAlert: (state, action) => {
      state.showSuccessAlert = true;
      state.successAlertData = action.payload;
    },
    triggerErrorAlert: (state, action) => {
      state.showErrorAlert = true;
      state.errorAlertData = action.payload;
    },
    triggerWarningAlert: (state, action) => {
      state.showWarningAlert = true;
      state.warningAlertData = action.payload;
    },
    triggerInfoAlert: (state, action) => {
      state.showInfoAlert = true;
      state.infoAlertData = action.payload;
    },

    hideAlert: (state) => {
      state.showInfoAlert = false;
      state.showSuccessAlert = false;
      state.showErrorAlert = false;
      state.showWarningAlert = false;
    },
  },
});

export const {
  triggerSuccessAlert,
  triggerErrorAlert,
  triggerWarningAlert,
  triggerInfoAlert,
  hideAlert,
} = alertSlice.actions;

export const alertReducer = alertSlice.reducer;

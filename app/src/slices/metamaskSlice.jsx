import { createSlice } from "@reduxjs/toolkit";

const metamaskSlice = createSlice({
  name: "metamask",
  initialState: {
    haveMetamask: false,
    isConnected: false,
    checkedConnection: false,
    selectedAccount: undefined,
    accounts: [],
  },
  reducers: {
    checkMetamask: (state) => {
      if (typeof window.ethereum !== "undefined") {
        state.haveMetamask = true;
      }
    },
    checkConnected: (state) => {
      if (typeof window.ethereum !== "undefined") {
        if (window.ethereum.selectedAddress != undefined) {
          state.isConnected = true;
          state.selectedAccount = window.ethereum.selectedAddress;
          state.accounts = [window.ethereum.selectedAddress];
        }
      }

      state.checkedConnection = true;
    },
    metamaskConnected: (state) => {
      state.isConnected = true;
    },
    disconnectMetamask: (state) => {
      state.isConnected = false;
    },
    setSelectedAccount: (state, action) => {
      state.selectedAccount = action.payload;
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
  },
});

export const { checkMetamask, checkConnected, disconnectMetamask } =
  metamaskSlice.actions;

export const connectMetamask = () => {
  return async (dispatch, getState) => {
    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      dispatch(metamaskSlice.actions.metamaskConnected());
      dispatch(metamaskSlice.actions.setSelectedAccount(accounts[0]));
      dispatch(metamaskSlice.actions.setAccounts(accounts));
    } catch (e) {
      if (e.code === 4001) {
        console.log("Please connect to MetaMask.");
      } else {
        console.error(e);
      }
    }
  };
};

export const metamaskReducer = metamaskSlice.reducer;

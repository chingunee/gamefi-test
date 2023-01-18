import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

import { metamaskReducer } from "./slices/metamaskSlice";
import { alertReducer } from "./slices/alertSlice";
import { appReducer } from "./slices/appSlice.jsx";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [""],
};

const rootReducer = combineReducers({
  metamask: metamaskReducer,
  alerts: alertReducer,
  app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

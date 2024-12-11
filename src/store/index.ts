import { configureStore } from "@reduxjs/toolkit";
import configSlice from "./configSlice";
import historySlice from "./historySlice";

export const store = configureStore({
  reducer: {
    appConfig: configSlice,
    history: historySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import configSlice from "./configSlice";
import historySlice from "./historySlice";
import collectionSlice from "./collectionSlice";

export const store = configureStore({
  reducer: {
    appConfig: configSlice,
    history: historySlice,
    collection: collectionSlice,
  },
  // middleware: applyMiddleware(middlewares, LogRocket.reduxMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

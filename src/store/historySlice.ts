import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type HistoryState = {
  history: Array<object>;
};

const initialState: HistoryState = {
  history: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<object[]>) => {
      state.history = action.payload;
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CollectionState = {
  collection: Array<object>;
};

const initialState: CollectionState = {
  collection: [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addToCollection: (state, action: PayloadAction) => {
      state.collection = action.payload;
    },
    clearCollection: (state) => {
      state.collection = [];
    },
  },
});

export const { addToCollection, clearCollection } = collectionSlice.actions;
export default collectionSlice.reducer;

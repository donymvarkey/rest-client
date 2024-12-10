import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ConfigState = {
  params: Array<any>;
  headers: Array<any>;
  body: object;
  baseUrl: string;
  url: string;
  history: Array<any>;
};

const initialState: ConfigState = {
  params: [],
  headers: [],
  body: {},
  baseUrl: "",
  url: "",
  history: [],
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setUrlParams: (state, action: PayloadAction<object>) => {
      state.params = [...state.params, action.payload];
    },
    deleteUrlParams: (state, action) => {
      state.params = [...action.payload];
    },
    deleteAllParams: (state) => {
      state.params = [];
    },
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setBaseUrl: (state, action: PayloadAction<string>) => {
      state.baseUrl = action.payload;
    },
  },
});

export const {
  setUrlParams,
  deleteUrlParams,
  deleteAllParams,
  setUrl,
  setBaseUrl,
} = configSlice.actions;

export default configSlice.reducer;

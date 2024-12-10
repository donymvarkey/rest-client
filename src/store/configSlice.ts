import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConfigState = {
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
    setUrlParams: (state, action) => {
      state.params = action.payload;
    },
    deleteUrlParams: (state, action) => {
      state.params = action.payload;
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
    setRequestBody: (state, action: PayloadAction<object>) => {
      state.body = action.payload;
    },
    clearRequestBody: (state) => {
      state.body = {};
    },
    setHeaders: (state, action) => {
      state.headers = action.payload;
    },
    clearHeaders: (state) => {
      state.headers = [];
    },
  },
});

export const {
  setUrlParams,
  deleteUrlParams,
  deleteAllParams,
  setUrl,
  setBaseUrl,
  setRequestBody,
  clearRequestBody,
  setHeaders,
  clearHeaders,
} = configSlice.actions;

export default configSlice.reducer;

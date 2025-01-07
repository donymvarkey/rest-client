import { AUTH_TYPES } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthType = {
  value: string;
  label: string;
};

export type AuthStateType = {
  authType: AuthType;
  authValue: object;
};

const initialState: AuthStateType = {
  authType: AUTH_TYPES[0],
  authValue: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthType: (state, action: PayloadAction<AuthType>) => {
      state.authType = action.payload;
    },

    setAuth: (state, action: PayloadAction<object>) => {
      state.authValue = action.payload;
    },
  },
});

export const { setAuthType, setAuth } = authSlice.actions;
export default authSlice.reducer;

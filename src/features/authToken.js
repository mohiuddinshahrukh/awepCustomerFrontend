import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { token: "" };
export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: {
      initialStateValue,
    },
  },

  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
    forgetToken: (state, action) => {
      state.value = initialStateValue;
    },
  },
});
export const { setToken, forgetToken } = tokenSlice.actions;
export default tokenSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  navbarState: true,
};
export const navbarSlice = createSlice({
  name: "navbarState",
  initialState: {
    value: initialStateValues,
  },

  reducers: {
    changeNavbar: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { changeNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;

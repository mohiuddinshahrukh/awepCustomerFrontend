import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  darkMode: false,
};
export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    value: initialStateValues,
  },

  reducers: {
    changeDarkMode: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { changeDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
// id: response.data.data.id,
// userType: response.data.data.userType,
// email: response.data.data.email,
// CNIC: response.data.data.CNIC,
// name: response.data.data.name,
// phone: response.data.data.phone,
// profileImage: response.data.data.profileImage,
// isEmailVerified: response.data.data.isEmailVerified,
// isPhoneVerified: response.data.data.isPhoneVerified,
// token: response.data.token,

import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  id: "",
  userType: "",
  email: "",
  CNIC: "",
  name: "",
  phone: "",
  profileImage: "",
  isEmailVerified: "",
  isPhoneVerified: "",
  token: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialStateValues,
  },

  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = initialStateValues;
    },
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
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

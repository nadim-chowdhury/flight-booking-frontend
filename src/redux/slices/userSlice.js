import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
});

export const { login, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;

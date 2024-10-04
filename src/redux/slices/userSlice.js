import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { user, access_token } = action.payload;

      // Set user info and authentication status in Redux
      state.userInfo = user;
      state.isAuthenticated = true;
      state.token = access_token;

      // Store user info and access token in cookies
      Cookies.set("flight_booking_access_info", access_token, { expires: 7 }); // Token expires in 7 days
      Cookies.set("flight_booking_user_info", JSON.stringify(user), {
        expires: 7,
      });
    },
    userLogout: (state) => {
      // Clear user info and authentication status in Redux
      state.userInfo = null;
      state.isAuthenticated = false;
      state.token = null;

      // Remove user info and access token from cookies
      Cookies.remove("flight_booking_access_info");
      Cookies.remove("flight_booking_user_info");
    },
    updateUserInfo: (state, action) => {
      // Update the user info in Redux
      state.userInfo = { ...state.userInfo, ...action.payload };

      // Update user info in cookies
      Cookies.set("flight_booking_user_info", JSON.stringify(state.userInfo), {
        expires: 7,
      });
    },
    loadUserFromCookies: (state) => {
      // Load access token from cookies
      const token = Cookies.get("flight_booking_access_info");

      // Load user info from cookies
      const userInfo = Cookies.get("flight_booking_user_info");

      if (token && userInfo) {
        state.token = token;
        state.userInfo = JSON.parse(userInfo); // Parse the user info from the cookie
        state.isAuthenticated = true;
      }
    },
  },
});

export const { userLogin, userLogout, updateUserInfo, loadUserFromCookies } =
  userSlice.actions;
export default userSlice.reducer;

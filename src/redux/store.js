import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchFlightsReducer from "./slices/searchFlightsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    searchFlights: searchFlightsReducer,
  },
});

export default store;

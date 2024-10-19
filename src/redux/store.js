import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchFlightsReducer from "./slices/searchFlightsSlice";
import airportReducer from "./slices/airportSlice"; // Import your slice

const store = configureStore({
  reducer: {
    user: userReducer,
    searchFlights: searchFlightsReducer,
    airports: airportReducer,
  },
});

export default store;

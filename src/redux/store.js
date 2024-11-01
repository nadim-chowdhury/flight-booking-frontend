import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import searchFlightsReducer from "./slices/searchFlightsSlice";
import airportReducer from "./slices/airportSlice"; // Import your slice
import localStorageAirportsReducer from "./slices/localStorageAirportsSlice"; // Import your slice
import selectAirportReducer from "./slices/selectAirportSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    searchFlights: searchFlightsReducer,
    airports: airportReducer,
    localStorageAirports: localStorageAirportsReducer,
    selectAirport: selectAirportReducer,
  },
});

export default store;

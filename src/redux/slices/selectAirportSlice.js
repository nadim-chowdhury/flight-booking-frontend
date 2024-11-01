import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departureAirport: null,
  destinationAirport: null,
};

const selectAirportSlice = createSlice({
  name: "selectAirport",
  initialState,
  reducers: {
    setDepartureAirport: (state, action) => {
      state.departureAirport = action.payload;
    },
    setDestinationAirport: (state, action) => {
      state.destinationAirport = action.payload;
    },
    clearAirports: (state) => {
      state.departureAirport = null;
      state.destinationAirport = null;
    },
  },
});

export const { setDepartureAirport, setDestinationAirport, clearAirports } =
  selectAirportSlice.actions;

export default selectAirportSlice.reducer;

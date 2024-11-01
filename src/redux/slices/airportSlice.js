import { createSlice } from "@reduxjs/toolkit";

const airportSlice = createSlice({
  name: "airports",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAirports: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearAirports: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setAirports, clearAirports, setLoading, setError } =
  airportSlice.actions;

export default airportSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const localStorageAirportsSlice = createSlice({
  name: "localStorageAirports",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLocalStorageAirports: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearLocalStorageAirports: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
    },
    setLocalStorageLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLocalStorageError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLocalStorageAirports,
  clearLocalStorageAirports,
  setLocalStorageLoading,
  setLocalStorageError,
} = localStorageAirportsSlice.actions;

export default localStorageAirportsSlice.reducer;

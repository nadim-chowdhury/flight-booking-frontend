// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk for fetching airports
// export const fetchAllAirports = createAsyncThunk(
//   "airports/fetchAllAirports",
//   async (searchTerm, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/amadeus/airports?keyword=${searchTerm}`
//       );
//       return response.data.data || []; // Returning the airport data
//     } catch (error) {
//       console.error("Failed to fetch airports:", error);
//       return rejectWithValue(
//         error.response?.data || "Failed to fetch airports"
//       );
//     }
//   }
// );

// const airportSlice = createSlice({
//   name: "airports",
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllAirports.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllAirports.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchAllAirports.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch airports";
//       });
//   },
// });

// export default airportSlice.reducer;

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

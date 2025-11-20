// src/redux/slices/hotelSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotels: [],
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    fetchHotelsRequest: (state) => {
      state.loading = true;
    },
    fetchHotelsSuccess: (state, action) => {
      state.loading = false;
      state.hotels = action.payload;
    },
    fetchHotelsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchHotelsRequest, fetchHotelsSuccess, fetchHotelsFailure } = hotelSlice.actions;
export default hotelSlice.reducer;

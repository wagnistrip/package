// src/redux/actions/hotelActions.js
import { fetchHotelsRequest, fetchHotelsSuccess, fetchHotelsFailure } from '../slices/hotelSlice';
import axios from 'axios';

export const fetchHotels = (searchParams) => async (dispatch) => {
  dispatch(fetchHotelsRequest());
  try {
    const response = await axios.get(`/api/hotels`, { params: searchParams }); // Replace with Amadeus API call
    dispatch(fetchHotelsSuccess(response.data));
  } catch (error) {
    dispatch(fetchHotelsFailure(error.message));
  }
};

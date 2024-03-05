import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData, fetchDataByFilter } from "./dataAPI";

const initialState = {
  data: [],
  status: "suman",
};

export const fetchDataAsync = createAsyncThunk(
  "data/fetchAllData",
  async () => {
    const response = await fetchData();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchDataByFilterAsync = createAsyncThunk(
  "data/fetchAllDataByFilter",
  async (filter) => {
    const response = await fetchDataByFilter(filter);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchDataByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDataByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default dataSlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import posService from "./posService";

let initialState = {
  soldItems: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// product registration
export const registerSell = createAsyncThunk(
  "pos/sellProducts",
  async (productData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      if (token) {
        return await posService.registerSell(productData, token);
      }
      if (!token) {
        console.log("መመዝገቢያ ቶክን ማንበብ አልተቻለም!");
      }
    } catch (error) {
      let message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetch product-items
export const fetchSoldItems = createAsyncThunk(
  "pos/soldProducts",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      if (token) {
        return await posService.fetchProduct(token);
      }
      if (!token) {
        console.log("መመዝገቢያ ቶክን ማንበብ አልተቻለም!");
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// bakery-slice
const POSSlice = createSlice({
  name: "soldItems",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerSell.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerSell.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.soldItems.push(action.payload);
      })
      .addCase(registerSell.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.Product = null;
      })

      // fetching case
      .addCase(fetchSoldItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSoldItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.soldItems = action.payload;
      })
      .addCase(fetchSoldItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = POSSlice.actions;
export default POSSlice.reducer;

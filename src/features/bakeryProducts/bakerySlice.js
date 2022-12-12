import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bakeryService from "./bakeryService.js";

let initialState = {
  bakeryProduct: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// product registration
export const addProduct = createAsyncThunk(
  "bakery/addProduct",
  async (productData, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      if (token) {
        return await bakeryService.registerProduct(productData, token);
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
export const fetchProduct = createAsyncThunk(
  "bakery/bakeryItems",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      if (token) {
        return await bakeryService.fetchProduct(token);
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
const BakerySlice = createSlice({
  name: "bakeryProduct",
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
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bakeryProduct.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.Product = null;
      })

      // fetching case
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bakeryProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = BakerySlice.actions;
export default BakerySlice.reducer;

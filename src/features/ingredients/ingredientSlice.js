import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ingredientService from "./ingredientService";

const initialState = {
  ingredients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const BrowseIngredients = createAsyncThunk(
  "ing/browseIngredient",
  async (_, thunkAPI) => {
    try {
      let token = thunkAPI.getState().auth.user.token;
      if (token) {
        return await ingredientService.FetchIngredients(token);
      }
      if (!token) {
        return "no token"
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

// Register user
export const AddIngredients = createAsyncThunk(
  "ing/addIngredient",
  async (Data, thunkAPI) => {
    try {
      let myToken = thunkAPI.getState().auth.user.token;
      return await ingredientService.RegisterIngredients(Data, myToken);
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

const ingredientSlice = createSlice({
  name: "ingredientItem",
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
      .addCase(AddIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ingredients.push(action.payload);
      })
      .addCase(AddIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.ingredients = [];
      })
      .addCase(BrowseIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(BrowseIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ingredients = action.payload;
      })
      .addCase(BrowseIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ingredientSlice.actions;
export default ingredientSlice.reducer;

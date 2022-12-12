import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import ingredientSlice from "../features/ingredients/ingredientSlice";
import BakeryReducer from "../features/bakeryProducts/bakerySlice";
import PosReducer from "../features/pos/posSlice";
import calculationSlice from "../features/calculations/calculationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ingredient: ingredientSlice,
    BakeryProduct: BakeryReducer,
    pos: PosReducer,
    calculation: calculationSlice,
  },
});

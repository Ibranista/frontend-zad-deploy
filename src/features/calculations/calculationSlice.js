import { createSlice } from "@reduxjs/toolkit";

const calculationSlice = createSlice({
    name: "calculation",
    initialState: {
        calculation: []
    },
    reducers: {
        addToCalculation: (state, action) => {
            state.calculation = [action.payload, ...state.calculation]
        },
        clearAllItems: (state) => {
            state.calculation = []
        },
    }
});

export default calculationSlice;
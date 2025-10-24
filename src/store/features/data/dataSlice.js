import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: JSON.parse(localStorage.getItem('theme')) || [],
};

export const dataset = createSlice({
    name: 'dataset',
    initialState: initialState,
    reducers: {
        getDataSet: (state, action) => {
            state.value = action.payload;
            localStorage.setItem('dataset', JSON.stringify(state.value))
        },
    }
})

export const { getDataSet } = dataset.actions
export default dataset.reducer
import { createSlice } from '@reduxjs/toolkit';

export const fetchSlice = createSlice({
    name: 'FetchQuery',
    initialState: {
        value: { products: [], loading: true, error: '' },
    },
    reducers: {
        FETCH_REQUEST: (state, action) => {
            state.value = {...state.value, loading: true };
        },
        FETCH_SUCCESS: (state, action) => {
            const { payload } = action;
            state.value = {...state.value, products: payload, loading: false };
        },
        FETCH_FAIL: (state, action) => {
            const { payload } = action;
            state.value = {...state.value, loading: false, error: payload };
        },
    },
});
export const { FETCH_SUCCESS, FETCH_REQUEST, FETCH_FAIL } = fetchSlice.actions;

export default fetchSlice.reducer;
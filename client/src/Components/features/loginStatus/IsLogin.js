import { createSlice } from '@reduxjs/toolkit';

export const logInSlicer = createSlice({
    name: 'LogIn',
    initialState: {
        value: { isLogin: false, data: [] },
    },
    reducers: {
        LOGIN: (state, action) => {
            const { payload } = action;

            state.value = {...state.value, data: payload, isLogin: true };
        },
        LOGOUT: (state, action) => {
            state.value = {...state.value, isLogin: false, data: [] };
        },
    },
});
export const { LOGIN, LOGOUT } = logInSlicer.actions;

export default logInSlicer.reducer;
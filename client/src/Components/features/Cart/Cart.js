import { createSlice } from '@reduxjs/toolkit';

export const cartSlicer = createSlice({
    name: 'Cart',
    initialState: {
        cart: {
            cartItem: localStorage.getItem('cartItems') ?
                JSON.parse(localStorage.getItem('cartItems')) :
                [],
        },
    },
    reducers: {
        CART_ADD_ITEM: (state, action) => {
            const { payload } = action;
            const newItem = payload;

            const existItem = state.cart.cartItem.find(
                (item) => item._id === newItem._id
            );
            const cartItems = existItem ?
                state.cart.cartItem.map((item) =>
                    item._id === existItem._id ? newItem : item
                ) :
                [...state.cart.cartItem, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            state.cart = {
                ...state.cart,
                cartItem: [...cartItems],
            };
        },
        CART_REMOVE_ITEM: (state, action) => {
            const { payload } = action;
            const cartItems = state.cart.cartItem.filter(
                (item) => item._id !== payload._id
            );

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            state.cart = {
                ...state.cart,
                cartItem: [...cartItems],
            };
        },

        CLEAR_CART: (state, action) => {
            state.cart = {
                ...state.cart,
                cartItem: [],
            };
        },
    },
});
export const { CART_ADD_ITEM, CART_REMOVE_ITEM, CLEAR_CART } =
cartSlicer.actions;

export default cartSlicer.reducer;
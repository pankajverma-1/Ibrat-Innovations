import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../Components/features/Cart/Cart';
import FetchQueryReducer from '../Components/features/FetchQu/Fetch_Query';
import LoginStatusReducer from '../Components/features/loginStatus/IsLogin';

const store = configureStore({
    reducer: {
        Cart: cartReducer,
        FetchQuery: FetchQueryReducer,
        LoginStatus: LoginStatusReducer,
    },
});

export default store;
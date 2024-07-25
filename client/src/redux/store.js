import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/slices/authSlice";
import {apiSlice} from "./features/apiSlices/apiSlice";


const store = configureStore({
    reducer:{
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    devTools:true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;
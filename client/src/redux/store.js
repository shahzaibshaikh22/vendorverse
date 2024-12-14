import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/slices/authSlice";
import productauth from "./features/slices/producSlice"
import {apiSlice} from "./features/apiSlices/apiSlice";


const store = configureStore({
    reducer:{
        auth: authReducer,
        productauth:productauth,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    devTools:true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store;
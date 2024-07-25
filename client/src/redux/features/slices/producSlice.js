import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "authProducts",
    initialState:{
        products: [],
        isLoading:true,
    },
    reducers: {
        getProducts:(state, action)=>{
            state.products = action.payload;
        },
       
    }
})

export const {getProducts } = productSlice.actions
export default productSlice.reducer
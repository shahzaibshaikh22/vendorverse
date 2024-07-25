import { apiSlice } from "./apiSlice";
let seller_url = 'http://localhost:5000/api/v1/seller';

export const sellerApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       sellerRequest:builder.mutation({
        query:(data)=>({
            url:`${seller_url}/register`,
            method:'POST',
            body:data
        })
       }) 
    })
})

export const { useSellerRequestMutation } = sellerApiSlice
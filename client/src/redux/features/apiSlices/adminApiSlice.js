import { apiSlice } from "./apiSlice";
let admin_url = 'http://localhost:5000/api/v1/admin';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getSellerRequests: builder.query({
            query: () => ({
              url: `${admin_url}/requests`,
              method: "GET",
            }),
            providesTags: ['sellerrequests'], // Yeh mutation ke invalidate ke sath match karega
          }),
        approveSellerRequest:builder.mutation({
            query:(data)=>({
                url:`${admin_url}/approve/request`,
                method:"POST",
                body:data,
            }),
            invalidatesTags:['sellerrequests']
        }),
        approvePayment:builder.mutation({
            query:(data)=>({
                url:`${admin_url}/approve/payment`,
                method:"POST",
                body:data,
            }),
            invalidatesTags:['sellerrequests']
        }),
        approveSeller:builder.mutation({
            query:(data)=>({
                url:`${admin_url}/approve/seller`,
                method:"POST",
                body:data,
            }),
            invalidatesTags:['sellerrequests']
        }),
        deleteSellerRequest:builder.mutation({
            query:(data)=>({
                url:`${admin_url}/delete/request`,
                method:"DELETE",
                body:data,
            }),
            invalidatesTags:['sellerrequests']
        })
    })
})

export const {
     useGetSellerRequestsQuery,
     useApproveSellerRequestMutation,
     useDeleteSellerRequestMutation,
     useApprovePaymentMutation,
     useApproveSellerMutation
     } = adminApiSlice
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const api = createApi({
//     reducerPath:'api',
//     baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
//     endpoints: (builder) => ({
//         registerUser: builder.mutation({
//             query: ({userData}) => ({
//               url: `/user/register`,
//               method: 'POST',
//               body: userData,
//             }),
//           }),
//         getUserById: builder.query({
//             query: (id) => `user/${id}`, // The path to your endpoint
//         }),
//     }),
// })
// export const { useGetUserByIdQuery, useRegisterUserMutation } = api
// export default api;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl:"", credentials: 'include' })


export const apiSlice = createApi({ 
    baseQuery,
    tagTypes:["USERMODELS","products","carts", "wishlists"],
    endpoints: (builder) => ({})
});


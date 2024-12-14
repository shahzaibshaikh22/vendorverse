import { apiSlice } from "./apiSlice";

let product_url = "http://localhost:5000/api/v1/product"
let cart_url = "http://localhost:5000/api/v1/cart"

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        fetchAllProducts: builder.query({
            query:()=>({
                url:`${product_url}/all`,
                method:"GET"
            })
        }),
        addProduct: builder.mutation({
            query: (formData) => ({
              url: `${product_url}/add`,
              method: "POST",
              body: formData, // Pass FormData directly
            }),
            invalidatesTags: ["products"], // Invalidate cache for products
          }),
        fetchCartItems: builder.query({
            query:(userId)=>({
                url:`${cart_url}/items/${userId}`,
                method:"GET",
                }),
            providesTags: ['carts'],
        }),
        fetchWishlistItems: builder.query({
            query:(userId)=>({
                url:`${cart_url}/itemsWishlist/${userId}`,
                method:"GET",
                }),
            providesTags: ['wishlists'],
        }),
        getTotalPrice: builder.query({
            query:(userId)=>({
                url:`${cart_url}/total/${userId}`,
                method:"GET",
                }),
                providesTags: ['carts'],
        }),
        getSingleProduct:builder.query({
            query:(id)=>({
                url:`${product_url}/single/${id}`,
                method:"GET"
            })
        }),
        addProductToCart: builder.mutation({
            query:(data)=>({
                url:`${cart_url}/add`,
                method:"POST",
                body:data
            }),
            invalidatesTags: ['carts'],
        }),
        addToWishlist: builder.mutation({
            query:(data)=>({
                url:`${cart_url}/addWishlist`,
                method:"POST",
                body:data
            }),
            invalidatesTags: ['wishlists'],
        }),
        deleteCartItem:builder.mutation({
           query:(data)=>({
            url:`${cart_url}/delete`,
            method:"POST",
            body:data
           }) ,
           invalidatesTags: ['carts'],
        }),
        deleteWishistItem:builder.mutation({
            query:(data)=>({
             url:`${cart_url}/deleteWishlist`,
             method:"POST",
             body:data
            }) ,
            invalidatesTags: ['wishlists'],
         }),
        increaseQuantity: builder.mutation({
            query:(data)=>({
                url:`${cart_url}/item/increase`,
                method:"POST",
                body:data
            }),
            invalidatesTags: ['carts'],
        }),
        decreaseQuantity: builder.mutation({
            query:(data)=>({
                url:`${cart_url}/item/decrease`,
                method:"POST",
                body:data
            }),
            invalidatesTags: ['carts'],
        }),
    })
})

export const { useAddProductMutation,  useFetchAllProductsQuery, useGetSingleProductQuery, useFetchCartItemsQuery, useAddProductToCartMutation, useIncreaseQuantityMutation, useDecreaseQuantityMutation, useDeleteCartItemMutation, useGetTotalPriceQuery, useAddToWishlistMutation, useDeleteWishistItemMutation, useFetchWishlistItemsQuery } = productApiSlice;
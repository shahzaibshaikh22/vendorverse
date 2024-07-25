import { apiSlice } from "./apiSlice";
let user_url = 'http://localhost:5000/api/v1/user'
export const userApiSclice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        userRegister: builder.mutation({
            query: (data) =>({
                url: `${user_url}/register`,
                method:"POST",
                body: data
            })
        }),
        verifyOtp:builder.mutation({
            query:(data)=>({
                url:`${user_url}/verify-otp`,
                method:'POST',
                body:data
            })
        }),
        login:builder.mutation({
            query:(data)=>({
                url:`${user_url}/login`,
                method:"POST",
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${user_url}/logout`,
                method:"POST",
            })
        }),
        resendOtp:builder.mutation({
            query:(data)=> ({
                url:`${user_url}/resend-otp`,
                method:"POST",
                body:data
            })
        }),
        profile:builder.query({
            query:(token)=>({
                url:`${user_url}/profile`,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        userImage:builder.query({
            query:(email)=>({
                url:`http://localhost:5000/photo`,
                method:"GET",
                params:{email}
            })
        }),
        updateProfile:builder.mutation({
            query:(data)=>({
                url:`${user_url}/update`,
                method:"PUT",
                body:data
            })
        }),
        switchUserRole:builder.mutation({
            query:()=>({
                url:`${user_url}/switch`,
                method:"POST",
            })
        }),
        switchAdminRole:builder.mutation({
            query:()=>({
                url:`${user_url}/admin/switch`,
                method:"POST",
            })
        }),

    })
})

export const { useUserRegisterMutation, useResendOtpMutation, useLoginMutation, useVerifyOtpMutation, useLogoutMutation,useSwitchUserRoleMutation, useSwitchAdminRoleMutation, useUserImageQuery, useProfileQuery, useUpdateProfileMutation } = userApiSclice;
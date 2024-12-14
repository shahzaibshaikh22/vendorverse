import { apiSlice } from "./apiSlice";
let chat_url = 'http://localhost:5000/api/v1/chats';

export const ChatApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       getChats:builder.query({
        query:(userId)=>({
            url:`${chat_url}/${userId}`,
            method:'Get',
        }),
        providesTags: ['conversations']
       }),
       sendMessage:builder.mutation({
        query:(data)=> ({
            url: `${chat_url}/messages`,
            method:"POST",
            body:data
        }),
        invalidatesTags: ['conversations']
    })
    }),
    
})

export const { useGetChatsQuery,useSendMessageMutation } = ChatApiSlice
import React from 'react'
import TopNav from '../userDashboardComponents/TopNav'
import { useSelector } from 'react-redux'
import ChatSidebar from '../components/ChatSidebar'
import { useGetChatsQuery } from '../redux/features/apiSlices/userApiSlice';
import Loading from "../components/Loading"

const Chats = () => {
    const { user } = useSelector((state)=> state.auth)
    let userId;
    if(user){
        userId = user._id
    }
    const { data,isLoading } = useGetChatsQuery(userId)

    if(isLoading){
        return(
            <Loading/>
        )
    }
  return (
    <>
        <TopNav/>
        {data && (
            <div className=' w-full flex '>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias distinctio consequatur temporibus autem, consequuntur dignissimos! Eius iure saepe, quod quam eum dolores fugiat magnam cumque ipsa, doloremque architecto molestiae impedit.</div>
            <ChatSidebar chatData={data}/>
        </div>
        )}
     </>
  )
}

export default Chats

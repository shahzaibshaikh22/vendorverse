import React from 'react'
import { useSelector } from "react-redux";
import { useGetChatsQuery } from "../redux/features/apiSlices/userApiSlice";

const ChatSidebar = ({chatData}) => {

  return (
    <div className="w-1/4 bg-white p-4 border-r">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 rounded-lg border focus:outline-none focus:ring focus:ring-orange-400"
          />
        </div>
        {/* Contacts List */}
        <ul>
          {chatData && chatData.map((chat)=>{
            return(
                <li
                key={chat._id}
                className={`p-4 mb-2 rounded-lg bg-white border hover:bg-gray-100`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://i.pravatar.cc/40?img=1`}
                      alt={chat.participants[1].username}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-semibold">{chat.participants[1].username}</span>
                  </div>
                  <div className="text-sm">5pm</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
  )
}

export default ChatSidebar

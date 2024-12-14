// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useGetChatsQuery, useSendMessageMutation } from "../redux/features/apiSlices/chatApiSlice";
// import Loading from "./Loading"

// const TestChat = () => {
//   const { user } = useSelector((state) => state.auth);
//   const userId = user._id; // Logged-in user's ID

//   const [conversations, setConversations] = useState([]); // List of chats
//   const [activeChat, setActiveChat] = useState(null); // Selected chat
//   const [messages, setMessages] = useState([]); // Messages for the active chat
//   const [messageText, setMessageText] = useState(""); // Input field

//   // get chats 
//   const { data, error, isLoading } = useGetChatsQuery(userId);

//   useEffect(() => {
//     // Check if data is available and has messages
//     if (data && data.length > 0) {
//       setConversations(data);
//       setActiveChat(data[0]); // Default to the first conversation
//       setMessages(data[0].messages); // Set messages for the first conversation
//     }
//   }, [data]);
//   // get chats

//   // Send message
//   const [sendMessage] = useSendMessageMutation();
//    // Send message

//   // const handleSendMessage = async () => {
//   //   if (!messageText.trim() || !activeChat) return;

//   //   const newMessage = {
//   //     senderId: userId,
//   //     receiverId: activeChat.participants.find((p) => p._id !== userId)._id,
//   //     message: messageText,
//   //   };

//   //   try {
//   //     const res = await sendMessage(newMessage)
//   //     setMessages([...messages, newMessage]);
//   //     setMessageText("");
      
//   //   } catch (error) {
//   //     console.error("Error sending message:", error);
//   //   }
//   // };
//   const handleSendMessage = async (file) => {
//     const newMessage = {
//           senderId: userId,
//           receiverId: activeChat.participants.find((p) => p._id !== userId)._id,
//           message: messageText,
//         };
//     const formData = new FormData();
//     formData.append("senderId", newMessage.senderId);
//     formData.append("receiverId", newMessage.receiverId);
//     formData.append("message", newMessage.message);
    
//     if (file) formData.append("file", file);
  
//     try {
//      const res = await sendMessage(formData)
//      if(res){
//       console.log(res);
      
//      }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };
  

//   // Delete chat
//   const handleDeleteChat = async () => {
//     if (!activeChat) return;

//     try {
//       await axios.patch(`http://localhost:5000/api/v1/chats/${activeChat.conversationId}/delete`, {
//         userId,
//       });
//       // Remove the deleted chat from the conversation list
//       setConversations((prev) => prev.filter((chat) => chat.conversationId !== activeChat.conversationId));
//       setActiveChat(null);
//       setMessages([]);
//     } catch (error) {
//       console.error("Error deleting chat:", error);
//     }
//   };

//   // Handle chat selection
//   const handleChatSelection = (chat) => {
//     setActiveChat(chat);
//     setMessages(chat.messages);
//   };

//   if(isLoading){
//     return(
//       <Loading/>
//     )
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
//         <div className="p-4 font-bold text-lg border-b border-gray-200">Chats</div>
//         {conversations.map((chat) => {
//           const otherParticipant = chat.participants.find((p) => p._id !== userId);
//           return (
//             <div
//               key={chat.conversationId}
//               onClick={() => handleChatSelection(chat)}
//               className={`p-4 cursor-pointer hover:bg-gray-100 border-b border-gray-200 ${
//                 activeChat?.conversationId === chat.conversationId ? "bg-gray-100" : ""
//               }`}
//             >
//               <div className="flex gap-2">
//                 <div className="w-10 h-10 rounded-full">
//                   <img className="w-full h-full object-cover rounded-full" src={`http://localhost:5000/${otherParticipant.avatar}`} alt="" />
//                 </div>
//               <div>
//               <div className="text-sm font-medium text-gray-800">
//                 {otherParticipant.username || "Unknown User"}
//               </div>
//               <div className="text-xs text-gray-500 truncate">
//                 {chat.messages[chat.messages.length - 1]?.message || "No messages yet"}
//               </div>
//               </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Chat Window */}
//       <div className="w-3/4 flex flex-col">
//         {activeChat ? (
//           <>
//             {/* Chat Header */}
//             <div className="p-4 border-b border-gray-200 bg-white font-bold text-lg flex justify-between items-center">
//               <span>
//                 Chat with {activeChat.participants.find((p) => p._id !== userId)?.username}
//               </span>
//               <button
//                 onClick={handleDeleteChat}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
//               >
//                 Delete Chat
//               </button>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//   {messages.map((msg, index) => (
//     <div
//       key={index}
//       className={`flex mb-2 ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
//     >
//       <div
//         className={`p-2 rounded-lg max-w-md text-sm ${
//           msg.senderId === userId
//             ? "bg-blue-500 text-white"
//             : "bg-white text-gray-800 border border-gray-200"
//         }`}
//       >
//         {msg.message}
//         <div className="text-xs text-gray-200 mt-1">
//           {msg.timestamp && new Date(msg.timestamp).toLocaleTimeString()} 
//         </div>
//       </div>
//     </div>
//   ))}
// </div>


//             {/* Message Input */}
//             <div className="p-4 bg-white border-t border-gray-200 flex items-center">
//               <input
//                 type="text"
//                 value={messageText}
//                 onChange={(e) => setMessageText(e.target.value)}
//                 placeholder="Type your message..."
//                 className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             Select a chat to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestChat;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetChatsQuery, useSendMessageMutation } from "../redux/features/apiSlices/chatApiSlice";
import Loading from "./Loading";
import { BsPaperclip } from "react-icons/bs";
import { Tooltip } from 'flowbite-react';
const TestChat = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file

  const { data, isLoading } = useGetChatsQuery(userId);

 

  const [sendMessage] = useSendMessageMutation();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    
  };
  console.log(selectedFile);

  const handleSendMessage = async () => {
    if (!messageText.trim() && !selectedFile) return;
    setMessageText("")

    const newMessage = {
      senderId: userId,
      receiverId: activeChat.participants.find((p) => p._id !== userId)._id,
      message: messageText,
    };

    const formData = new FormData();
    formData.append("senderId", newMessage.senderId);
    formData.append("receiverId", newMessage.receiverId);
    formData.append("message", newMessage.message);

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const res = await sendMessage(formData);
      if(res){
        setMessages([...messages, newMessage]);
        setMessageText("")
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChatSelection = (chat) => {
    setActiveChat(chat);
    setMessages(chat.messages);
  };
  //   // Delete chat
  const handleDeleteChat = async () => {
    if (!activeChat) return;

    try {
      await axios.patch(`http://localhost:5000/api/v1/chats/${activeChat.conversationId}/delete`, {
        userId,
      });
      // Remove the deleted chat from the conversation list
      setConversations((prev) => prev.filter((chat) => chat.conversationId !== activeChat.conversationId));
      setActiveChat(null);
      setMessages([]);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };
  useEffect(() => {
    if (data && data.length > 0) {
      console.log(data);
      
      setConversations(data);
      setActiveChat(data[0]);
      setMessages(data[0].messages);
    }
  }, [data,userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 font-bold text-lg border-b border-gray-200">Chats</div>
        {conversations.map((chat) => {
          const otherParticipant = chat.participants.find((p) => p._id !== userId);
          return (
            <div
              key={chat.conversationId}
              onClick={() => handleChatSelection(chat)}
              className={`p-4 cursor-pointer hover:bg-gray-100 border-b border-gray-200 ${
                activeChat?.conversationId === chat.conversationId ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-full">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={`http://localhost:5000/${otherParticipant.avatar}`}
                    alt=""
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {otherParticipant.username || "Unknown User"}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {chat.messages[chat.messages.length - 1]?.message || "No messages yet"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

     {
      data &&  <div className="w-3/4 flex flex-col">
      {activeChat ? (
        <>
          <div className="p-4 border-b border-gray-200 bg-white font-bold text-lg flex justify-between items-center">
            <span>
              Chat with {activeChat.participants.find((p) => p._id !== userId)?.username}
            </span>
            <button
              onClick={handleDeleteChat}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
            >
              Delete Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-2 rounded-lg max-w-md text-sm ${
                    msg.senderId === userId
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {msg.message}
                  {msg.file && (
                    <div className="mt-2">
                      <a href={`http://localhost:5000/chat/${msg.file}`} target="_blank" rel="noopener noreferrer">
                        <img
                          src={`http://localhost:5000/chat/${msg.file}`}
                          alt="File"
                          className="max-h-40 object-contain"
                        />
                      </a>
                    </div>
                  )}
                  
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
            />
            <label className="px-4" htmlFor="attachement">
              <Tooltip content="Attach file">
              <BsPaperclip className="text-2xl cursor-pointer"/>
      
             </Tooltip>
              {selectedFile && (
    <img
      src={URL.createObjectURL(selectedFile)} // Create a temporary URL for the selected file
      alt="Selected File"
      className="w-20 h-20 object-cover rounded-lg mt-2" // Optional styling
    />
  )}
            <input
              id="attachement"
              type="file"
              onChange={handleFileChange}
              className="mr-2 hidden"
            />
            </label>
           
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a chat to start messaging
        </div>
      )}
    </div>
     }
    </div>
  );
};

export default TestChat;


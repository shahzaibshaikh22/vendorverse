// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useGetChatsQuery, useSendMessageMutation } from "../redux/features/apiSlices/chatApiSlice";
// import Loading from "./Loading";
// import { BsPaperclip } from "react-icons/bs";
// import { Tooltip } from 'flowbite-react';


// const TestChat = () => {

//   const [conversations, setConversations] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageText, setMessageText] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
  
//   // user Id from redux store
//   const { user } = useSelector((state) => state.auth);
//   const userId = user._id;

//   // fetching user's chat data 
//   const { data, isLoading } = useGetChatsQuery(userId);

//   // send message mutation instance
//   const [sendMessage] = useSendMessageMutation();

//   // handle on dile change
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
    
//   };

//   // send message function 
//   const handleSendMessage = async () => {
//     if (!messageText.trim() && !selectedFile) return;
  
//     try {
//       const formData = new FormData();
//       formData.append("senderId", userId);
//       formData.append("receiverId", activeChat.participants.find((p) => p._id !== userId)._id);
//       formData.append("message", messageText);
  
//       if (selectedFile) {
//         formData.append("file", selectedFile, selectedFile.name); // Add filename
//       }
  
//       const res = await sendMessage(formData).unwrap(); // Use .unwrap() with RTK Query
      
//       if (res) {
//         // Create new message object with file information
//         const newMessage = {
//           senderId: userId,
//           receiverId: activeChat.participants.find((p) => p._id !== userId)._id,
//           message: messageText,
//           file: res.conversation.messages[res.conversation.messages.length - 1].file // Get file from response
//         };        
//         setMessages(res.conversation.messages);
//         setMessageText("");
//         setSelectedFile(null);
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   // handle chat slection by clicking on sidebar section
//   const handleChatSelection = (chat) => {
//     setActiveChat(chat);
//     setMessages(chat.messages);
//   };
//    // handle  Delete chat
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

//   // getting data if any changes in  data 
//   useEffect(() => {
//     if (data && data.length > 0) {
//       setConversations(data);
//       setActiveChat(data[0]);
//       setMessages(data[0].messages);
//     }
//   }, [data,userId]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="flex h-screen bg-gray-50">
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
//                   <img
//                     className="w-full h-full object-cover rounded-full"
//                     src={`http://localhost:5000/${otherParticipant.avatar}`}
//                     alt=""
//                   />
//                 </div>
//                 <div>
//                   <div className="text-sm font-medium text-gray-800">
//                     {otherParticipant.username || "Unknown User"}
//                   </div>
//                   <div className="text-xs text-gray-500 truncate">
//                     {chat.messages[chat.messages.length - 1]?.message || "No messages yet"}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//      {
//       data &&  <div className="w-3/4 flex flex-col">
//       {activeChat ? (
//         <>
//           <div className="p-4 border-b border-gray-200 bg-white font-bold text-lg flex justify-between items-center">
//             <span>
//               Chat with {activeChat.participants.find((p) => p._id !== userId)?.username}
//             </span>
//             <button
//               onClick={handleDeleteChat}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
//             >
//               Delete Chat
//             </button>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex mb-2 ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`p-2 rounded-lg max-w-md text-sm ${
//                     msg.senderId === userId
//                       ? "bg-blue-500 text-white"
//                       : "bg-white text-gray-800 border border-gray-200"
//                   }`}
//                 >
//                   {msg.message}
//                   {msg.file && (
//                     <div className="mt-2">
//                       <a href={`http://localhost:5000/chat/${msg.file}`} target="_blank" rel="noopener noreferrer">
//                         <img
//                           src={`http://localhost:5000/chat/${msg.file}`}
//                           alt="File"
//                           className="max-h-40 object-contain"
//                         />
//                       </a>
//                     </div>
//                   )}
                  
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="p-4 bg-white border-t border-gray-200 flex items-center">
//             <input
//               type="text"
//               value={messageText}
//               onChange={(e) => setMessageText(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
//             />
//             <label className="px-4" htmlFor="attachement">
//               <Tooltip content="Attach file">
//               <BsPaperclip className="text-2xl cursor-pointer"/>
      
//              </Tooltip>
//               {selectedFile && (
//     <img
//       src={URL.createObjectURL(selectedFile)} // Create a temporary URL for the selected file
//       alt="Selected File"
//       className="w-20 h-20 object-cover rounded-lg mt-2" // Optional styling
//     />
//   )}
//             <input
//               id="attachement"
//               type="file"
//               onChange={handleFileChange}
//               className="mr-2 hidden"
//             />
//             </label>
           
//             <button
//               onClick={handleSendMessage}
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg"
//             >
//               Send
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-gray-500">
//           Select a chat to start messaging
//         </div>
//       )}
//     </div>
//      }
//     </div>
//   );
// };

// export default TestChat;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetChatsQuery, useSendMessageMutation } from "../redux/features/apiSlices/chatApiSlice";
import Loading from "./Loading";
import { BiImageAdd } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { Tooltip } from "flowbite-react";
import { io } from "socket.io-client";

const TestChat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Socket.IO instance
  const socket = io("http://localhost:5000", { withCredentials: true });

  useEffect(() => {
    // Listen for new messages
    socket.on("newMessage", (message) => {
      if (message.conversationId === activeChat?.conversationId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.disconnect(); // Cleanup on unmount
    };
  }, [activeChat]);

  // user Id from redux store
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  // fetching user's chat data
  const { data, isLoading } = useGetChatsQuery(userId);

  // send message mutation instance
  const [sendMessage] = useSendMessageMutation();

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Send message
  const handleSendMessage = async () => {
    if (!messageText.trim() && !selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("receiverId", activeChat.participants.find((p) => p._id !== userId)._id);
      formData.append("message", messageText);

      if (selectedFile) {
        formData.append("file", selectedFile, selectedFile.name);
      }

      const res = await sendMessage(formData).unwrap();
      if (res) {
        const newMessage = {
          senderId: userId,
          receiverId: activeChat.participants.find((p) => p._id !== userId)._id,
          message: messageText,
          file: res.conversation.messages[res.conversation.messages.length - 1].file,
        };

        setMessages(res.conversation.messages);
        setMessageText("");
        setSelectedFile(null);

        // Emit message to Socket.IO server
        socket.emit("sendMessage", {
          conversationId: activeChat.conversationId,
          ...newMessage,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Select chat room
  const handleChatSelection = (chat) => {
    setActiveChat(chat);
    setMessages(chat.messages);

    // Join the selected chat room
    socket.emit("joinRoom", { roomId: chat.conversationId });
  };

  // Delete chat
  const handleDeleteChat = async () => {
    if (!activeChat) return;

    try {
      await axios.patch(`http://localhost:5000/api/v1/chats/${activeChat.conversationId}/delete`, {
        userId,
      });

      setConversations((prev) => prev.filter((chat) => chat.conversationId !== activeChat.conversationId));
      setActiveChat(null);
      setMessages([]);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setConversations(data);
      setActiveChat(data[0]);
      setMessages(data[0].messages);

      // Automatically join the first chat room
      socket.emit("joinRoom", { roomId: data[0].conversationId });
    }
  }, [data, userId]);

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
      <div className="w-3/4 flex flex-col">
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
            <div className="p-4 bg-gray-50">
              <div className="flex flex-col gap-2 rounded-lg p-2 border-2 border-gray-300">
              {selectedFile && (
                <div className="w-20 h-20  relative">
                   <span onClick={()=>setSelectedFile(null)} className="absolute w-6 h-6 flex  items-center justify-center cursor-pointer top-4 right-2 bg-black text-white text-sm rounded-full text-center">
                    <FaTimes/>
                   </span>
                   <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected File"
                    className="w-full h-full object-cover rounded-lg mt-2"
                  />
                 </div>
                )}
             <div className="flex items-center">
             <label className="px-2" htmlFor="attachment">
                <Tooltip content="Attach file">
                  <BiImageAdd className="text-2xl cursor-pointer" />
                </Tooltip>
               
                <input
                  id="attachment"
                  type="file"
                  onChange={handleFileChange}
                  className="mr-2 hidden "
                />
              </label>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 chatInput border-none outline-none right-0 rounded-lg p-2 mr-2"
              />
              
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 flex items-center justify-center w-10 h-10  text-white  rounded-full"
              >
                <IoSend/>
              </button>
             </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default TestChat;


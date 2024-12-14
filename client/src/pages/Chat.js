import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = () => {
  const {user} = useSelector((state)=>state.auth)
    const [showChat, setShowChat] = useState(false); // To toggle chat interface
    const [messages, setMessages] = useState([]); // Messages state
    const [messageText, setMessageText] = useState(""); // Input message
    const {sellerId} = useParams()
    let loggedInUserId;
    if(user){
      loggedInUserId = user._id
    }

      const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const newMessage = {
      senderId: loggedInUserId,
      receiverId: sellerId, // Seller's ID
      message: messageText,
      timestamp: new Date(),
    };

    // Save message to the database
    try {
      await axios.post("http://localhost:5000/api/v1/chats/messages", newMessage);
      setMessages([...messages, newMessage]); // Update messages state
      setMessageText("");
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };
  return (
    <div className="w-full pt-20">
         {/* Button to Open Chat */}
         
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowChat(true)}
            >
              Send Message to Seller
            </button>
         
    
          {/* Chat Interface */}
          {showChat && (
            <div className="w-full bg-gray-100 border rounded shadow-lg p-4">
              <h2 className="text-xl font-bold mb-4">
                Chat with {sellerId}
              </h2>
              <div className="h-64 overflow-y-auto mb-4 bg-white p-4 rounded">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${
                        msg.senderId === loggedInUserId
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-md max-w-xs ${
                          msg.senderId === loggedInUserId
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {msg.message}
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(msg.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No messages yet. Start the conversation!</p>
                )}
              </div>
    
              {/* Message Input */}
              <div className="flex items-center">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded p-2 mr-2"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
  )
}

export default Chat


const Conversation = require("../models/conversation");
const USERMODEL = require("../models/userModel");
const Sellers = require("../models/sellers");



// const getChats = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Fetch conversations where the user is a participant
//     const conversations = await Conversation.find({
//       participants: userId,
//     }).populate("participants", "username avatar email");

//     if (!conversations || conversations.length === 0) {
//       return res.status(200).json([]); // No conversations found
//     }

//     const result = conversations.map((conversation) => {
//       const userDeletedAt = conversation.deletedAt?.get(userId);

//       // Filter messages that are after user's deletion time
//       const filteredMessages = conversation.messages.filter((msg) => {
//         return !userDeletedAt || new Date(msg.timestamp) > new Date(userDeletedAt);
//       });

//       // Skip conversations with no messages after deletion
//       if (filteredMessages.length === 0) {
//         return null;
//       }

//       return {
//         conversationId: conversation._id,
//         participants: conversation.participants.filter(
//           (p) => p._id.toString() !== userId
//         ), // Exclude current user from participants list
//         messages: filteredMessages,
//       };
//     });

//     // Remove null conversations
//     const filteredResult = result.filter((conv) => conv !== null);

//     res.status(200).json(filteredResult);
//   } catch (error) {
//     console.error("Error fetching chats:", error);
//     res.status(500).json({ message: "Failed to fetch chats" });
//   }
// };

// const getChats = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Fetch conversations where the user is a participant
//     const conversations = await Conversation.find({
//       participants: userId, // User is a participant
//     }).populate("participants", "username avatar email");

//     if (!conversations || conversations.length === 0) {
//       return res.status(200).json([]); // No conversations found
//     }

//     const result = conversations.map((conversation) => {
//       const userDeletedAt = conversation.deletedAt?.get(userId);

//       // Filter messages that are after user's deletion time
//       const filteredMessages = conversation.messages.filter((msg) => {
//         return !userDeletedAt || new Date(msg.timestamp) > new Date(userDeletedAt);
//       });

//       // Check if the user has deleted all messages
//       if (filteredMessages.length === 0) {
//         return null; // Exclude this conversation for the user
//       }

//       return {
//         conversationId: conversation._id,
//         participants: conversation.participants.filter(
//           (p) => p._id.toString() !== userId
//         ), // Exclude current user from participants list
//         messages: filteredMessages,
//       };
//     });

//     // Filter out null values
//     const filteredResult = result.filter((conv) => conv !== null);

//     res.status(200).json(filteredResult);
//   } catch (error) {
//     console.error("Error fetching chats:", error);
//     res.status(500).json({ message: "Failed to fetch chats" });
//   }
// };


const getChats = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    }).populate("participants", "username avatar email");

    if (!conversations || conversations.length === 0) {
      return res.status(200).json([]); // No conversations found
    }

    const result = conversations.map((conversation) => {
      const userDeletedAt = conversation.deletedAt?.get(userId);

      // Filter messages that are after user's deletion time
      const filteredMessages = conversation.messages.filter((msg) => {
        return !userDeletedAt || new Date(msg.timestamp) > new Date(userDeletedAt);
      });

      // Skip conversations with no messages after deletion
      if (filteredMessages.length === 0) {
        return null;
      }

      return {
        conversationId: conversation._id,
        participants: conversation.participants.filter(
          (p) => p._id.toString() !== userId
        ), // Exclude current user from participants list
        messages: filteredMessages.map((msg) => ({
          messageId: msg._id,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          message: msg.message,
          file: msg.file, // Include file path in the response
          timestamp: msg.timestamp,
        })),
      };
    });

    // Remove null conversations
    const filteredResult = result.filter((conv) => conv !== null);

    res.status(200).json(filteredResult);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

const deleteChat = async (req, res) => {
  const { _id } = req.params; // Conversation ID
  const { userId } = req.body; // ID of the user deleting the chat

  try {
    const conversation = await Conversation.findById(_id);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Mark chat as deleted for the user
    conversation.deletedAt.set(userId, new Date());

    // Check if both users have deleted
    const allParticipantsDeleted = conversation.participants.every((p) =>
      conversation.deletedAt.has(p.toString())
    );

    if (allParticipantsDeleted) {
      // Delete conversation completely
      await Conversation.findByIdAndDelete(_id);
      return res.status(200).json({ message: "Conversation deleted for both users" });
    }

    await conversation.save();
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ message: "Failed to delete chat" });
  }
};

const sendMessage = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // New conversation setup
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [
          {
            senderId,
            receiverId,
            message,
            timestamp: new Date(),
          },
        ],
        deletedAt: {}, // Initialize empty map
      });

      await conversation.save();

      return res.status(200).json({
        message: "Conversation created and message sent successfully",
        conversation,
      });
    }

    // Add new message
    const newMessage = {
      senderId,
      receiverId,
      message,
      timestamp: new Date(),
    };

    conversation.messages.push(newMessage);

    // Reset `deletedAt` only for the sender (receiver's deletedAt remains as is)
    conversation.deletedAt.delete(senderId);

    await conversation.save();

    res.status(200).json({
      message: "Message sent successfully",
      conversation,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};


  // const sendMessage = async (req, res) => {
  //   const { senderId, receiverId, message } = req.body;
  //   const file = req.file; // File from multer

  //   try {
  //     let conversation = await Conversation.findOne({
  //       participants: { $all: [senderId, receiverId] },
  //     });

  //     if (!conversation) {
  //       // New conversation setup
  //       conversation = new Conversation({
  //         participants: [senderId, receiverId],
  //         messages: [
  //           {
  //             senderId,
  //             receiverId,
  //             message,
  //             file: file ? `${file.filename}` : null, // Save file path
  //             timestamp: new Date(),
  //           },
  //         ],
  //         deletedAt: {}, // Initialize empty map
  //       });

  //       await conversation.save();

  //       return res.status(200).json({
  //         message: "Conversation created and message sent successfully",
  //         conversation,
  //       });
  //     }

  //     // Add new message
  //     const newMessage = {
  //       senderId,
  //       receiverId,
  //       message,
  //       file: file ? `${file.filename}` : null, // Save file path
  //       timestamp: new Date(),
  //     };
  //       // Emit the message to all connected clients
  //       if (req.io) {
  //         req.io.emit("receiveMessage", newMessage);
  //       } else {
  //         console.error("Socket.IO instance not found on req");
  //         return res.status(500).json({ message: "Socket.IO instance not found" });
  //       }


  //     conversation.messages.push(newMessage);

  //     // Reset `deletedAt` only for the sender
  //     conversation.deletedAt.delete(senderId);

  //     await conversation.save();

  //     res.status(200).json({
  //       message: "Message sent successfully",
  //       conversation,
  //     });
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //     res.status(500).json({ message: "Failed to send message" });
  //   }
  // };

  // const sendMessage = async (req, res) => {
  //   const { senderId, receiverId, message } = req.body;
  //   const file = req.file;
  
  //   try {
  //     // Debug log
  //     console.log('Socket IO instance:', req.io);
  
  //     let conversation = await Conversation.findOne({
  //       participants: { $all: [senderId, receiverId] },
  //     });
  
  //     const newMessage = {
  //       senderId,
  //       receiverId,
  //       message,
  //       file: file ? `${file.filename}` : null,
  //       timestamp: new Date(),
  //     };
  
  //     if (!conversation) {
  //       conversation = new Conversation({
  //         participants: [senderId, receiverId],
  //         messages: [newMessage],
  //         deletedAt: {},
  //       });
  //     } else {
  //       conversation.messages.push(newMessage);
  //       conversation.deletedAt.delete(senderId);
  //     }
  
  //     await conversation.save();
  
  //     // Socket.IO emission with error handling
  //     if (req.io) {
  //       try {
  //         req.io.emit('newMessage', {
  //           conversationId: conversation._id,
  //           message: newMessage
  //         });
  //         console.log('Message emitted via socket');
  //       } catch (socketError) {
  //         console.error('Socket emission error:', socketError);
  //       }
  //     } else {
  //       console.warn('Socket.IO instance not available');
  //     }
  
  //     res.status(200).json({
  //       success: true,
  //       message: "Message sent successfully",
  //       conversation,
  //     });
  
  //   } catch (error) {
  //     console.error("Error in sendMessage:", error);
  //     res.status(500).json({ 
  //       success: false, 
  //       message: "Failed to send message",
  //       error: error.message 
  //     });
  //   }
  // };


// const sendMessage = async (req, res) => {
//   const { senderId, receiverId, message } = req.body;

//   try {
//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       // New conversation setup
//       conversation = new Conversation({
//         participants: [senderId, receiverId],
//         messages: [
//           {
//             senderId,
//             receiverId,
//             message,
//             timestamp: new Date(),
//           },
//         ],
//         deletedAt: {}, // Initialize empty map
//       });

//       await conversation.save();

//       return res.status(200).json({
//         message: "Conversation created and message sent successfully",
//         conversation,
//       });
//     }

//     // Add new message
//     const newMessage = {
//       senderId,
//       receiverId,
//       message,
//       timestamp: new Date(),
//     };

//     conversation.messages.push(newMessage);

//     // Reset deletedAt for both users
//     conversation.deletedAt.delete(senderId);
//     conversation.deletedAt.delete(receiverId);

//     await conversation.save();

//     res.status(200).json({
//       message: "Message sent successfully",
//       conversation,
//     });
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ message: "Failed to send message" });
//   }
// };




module.exports = {
    deleteChat,
    getChats,
    sendMessage
}
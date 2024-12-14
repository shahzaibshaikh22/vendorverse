const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "USERMODEL", required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "USERMODEL", required: true },
  message: { type: String, required: false }, // Optional if file is present
  file: { type: String, required: false }, // Path of the uploaded file
  timestamp: { type: Date, default: Date.now },
});

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "USERMODEL" }],
  messages: [messageSchema],
  deletedAt: {
    type: Map,
    of: Date, // Key: userId, Value: deletion timestamp
    default: {}, // Empty object for no deletions
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;

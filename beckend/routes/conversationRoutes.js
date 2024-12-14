const express = require("express");
const { getChats, sendMessage, deleteChat } = require("../controllers/chatsController");
const route = express.Router();


const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/chat/"); // Files will be stored in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

// Multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG, and PDF files are allowed"));
    }
  },
});
route.get('/:userId', getChats);
route.post('/messages', upload.single("file"), sendMessage);
route.patch("/:_id/delete",deleteChat)

module.exports = route;
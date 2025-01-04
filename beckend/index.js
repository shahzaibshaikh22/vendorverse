// // const express = require("express");
// // const app = express();
// // const dotenv = require("dotenv").config();
// // const morgan = require("morgan");
// // const cors = require("cors")
// // const PORT = 5000 || process.env.PORT;
// // const connection = require("./databse/bd")
// // const multer = require("multer")
// // const fs = require('fs');
// // const path = require("path")
// // const Avatar = require("./models/userAvatar")
// // const USERMODEL = require("./models/userModel");
// // const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");
// // const cookieParser = require("cookie-parser")
// // const bodyParser = require("body-parser")



// // app.use(cookieParser())


// // // CORS configuration
// // app.use(cors({
// //   origin: 'http://localhost:3000', // Your frontend's URL
// //   credentials: true, // Allow credentials (cookies) to be sent
// // }));
// // app.use(morgan("tiny"));

// // app.use(express.json());
// // app.use(express.urlencoded({extended:true}));
// // app.use("/api/v1", require("./routes/userRoutes"))
// // app.use("/api/v1/admin", require("./routes/adminRoutes"))
// // app.use("/api/v1/seller", require("./routes/sellerRoutes"))
// // app.use("/api/v1/product", require("./routes/productRoutes"))
// // app.use("/api/v1/cart", require("./routes/cartRoutes"))
// // app.use("/api/v1/wishlist", require("./routes/wishlistRoute"))
// // app.use("/api/v1/chats", require("./routes/conversationRoutes"))
// // app.use(express.static("uploads"))
// // app.use(express.static("uploads/productimgs"))
// // app.use(express.static("uploads/chat"))

// // // Set up multer storage
// // const storage = multer.diskStorage({
// //   destination:"./uploads",
// //   filename:(req, file, cb)=>{
// //     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)) // Use the original filename for the uploaded file
// //   }
// // });

// // // Set up multer middleware
// // const upload = multer({ storage: storage  });


// // app.post('/upload', upload.single('image'), async (req, res) => {
// //   try {
// //     const _id = req.body;
// //     const user = await USERMODEL.findById(_id)

// //       const { filename, path ,mimetype } = req.file;

// //       const newImage = new Avatar({
// //           filename,
// //           path,
// //           mimetype,
// //           email:req.body.email
// //       });
// //        user.avatar = filename;

// //       await user.save();
// //       await newImage.save();

// //       res.json({user:{
// //         id:user._id,
// //         username:user.username,
// //         email:user.email,
// //         createdAt:user.createdAt,
// //         phone:user.phone,
// //         avatar:user.avatar,
// //         verified:user.verified,
// //         country:user.country,
// //         state:user.state,
// //         phone2:user.phone2,
// //         role:user.role,
// //         isActive:user.isActive,
// //         isAdmin:user.isAdmin,
// //         isSeller:user.isSeller,
// //       }});
// //   } catch (error) {
// //       console.error(error);
// //       res.status(500).json({ message: 'Error uploading image' });
// //   }
// // });




// // // get images by email
// // app.get("/photo/:email", async(req,res)=>{
// //   try {
// //     const email = req.params.email;
// //     const user = await USERMODEL.findOne({email})
// //     if(!user){
// //       return res.json({err:"no image found "})
// //     }
// //     res.json({avatar:user.avatar})
// //   } catch (error) {
// //     console.log(error.message);
// //   }
// // })



// // connection();
// // app.listen(PORT, ()=>{
// //     console.log(`server is running on ${PORT}`);
// // })


// // ***********************------*****************
// // ***********************------*****************

// const express = require("express");
// const http = require("http");
// const dotenv = require("dotenv").config();
// const morgan = require("morgan");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const multer = require("multer");
// const path = require("path");
// const connection = require("./databse/bd");
// const Avatar = require("./models/userAvatar");
// const USERMODEL = require("./models/userModel");

// const PORT =  5000;
// const app = express();



// // Middleware
// app.use(morgan("tiny"));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use("/api/v1", require("./routes/userRoutes"))
// app.use("/api/v1/admin", require("./routes/adminRoutes"))
// app.use("/api/v1/seller", require("./routes/sellerRoutes"))
// app.use("/api/v1/product", require("./routes/productRoutes"))
// app.use("/api/v1/cart", require("./routes/cartRoutes"))
// app.use("/api/v1/wishlist", require("./routes/wishlistRoute"))
// app.use("/api/v1/chats", require("./routes/conversationRoutes"))
// app.use(express.static("uploads"))
// app.use(express.static("uploads/productimgs"))
// app.use(express.static("uploads/chat"))

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage: storage });

// // Routes
// app.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const _id = req.body._id;
//     const user = await USERMODEL.findById(_id);

//     const { filename, path, mimetype } = req.file;
//     const newImage = new Avatar({ filename, path, mimetype, email: req.body.email });

//     user.avatar = filename;
//     await user.save();
//     await newImage.save();

//     res.json({
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         avatar: user.avatar,
//         createdAt: user.createdAt,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error uploading image" });
//   }
// });

// app.get("/photo/:email", async (req, res) => {
//   try {
//     const email = req.params.email;
//     const user = await USERMODEL.findOne({ email });
//     if (!user) {
//       return res.json({ err: "No image found" });
//     }
//     res.json({ avatar: user.avatar });
//   } catch (error) {
//     console.error(error.message);
//   }
// });





// // Database connection
// connection();

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const connection = require("./databse/bd");
const Avatar = require("./models/userAvatar");
const USERMODEL = require("./models/userModel");
const Conversation = require("./models/conversation");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PORT = 5000;
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  },
});

// Middleware
app.use(morgan("tiny"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// stripe
// Create Payment Intent

app.post('/api/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  try {
    // Extract cart data from products
    const cart = products.cart;
    const lineItems = [];

    // Loop through sellers and their items
    cart.sellers.forEach((seller) => {
      seller.items.forEach((item) => {
        lineItems.push({
          price_data: {
            currency: 'usd', // Replace 'usd' with your preferred currency
            product_data: {
              name: item.productId.name,
              images: [`http://localhost:5000/${item.productId.image}`], // Add product image URL here
            },
            unit_amount: item.productId.price * 100, // Stripe expects prices in cents
          },
          quantity: item.quantity,
        });
      });
    });
    console.log(cart);
    

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://localhost:3000/success',
      cancel_url: 'https://localhost:3000/cancel',
    });

    // Return session details
    return res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.use("/api/v1", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/seller", require("./routes/sellerRoutes"));
app.use("/api/v1/product", require("./routes/productRoutes"));
app.use("/api/v1/cart", require("./routes/cartRoutes"));
app.use("/api/v1/wishlist", require("./routes/wishlistRoute"));
app.use("/api/v1/chats", require("./routes/conversationRoutes"));
app.use(express.static("uploads"));
app.use(express.static("uploads/productimgs"));
app.use(express.static("uploads/chat"));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Real-time Socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for join room event
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Listen for new message
  socket.on("sendMessage", async ({ roomId, message }) => {
    try {
      const conversation = await Conversation.findById(roomId);

      if (conversation) {
        const newMessage = {
          senderId: message.senderId,
          receiverId: message.receiverId,
          message: message.message,
          file: message.file || null,
          timestamp: new Date(),
        };

        conversation.messages.push(newMessage);
        await conversation.save();

        // Emit the new message to all clients in the room
        io.to(roomId).emit("newMessage", newMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Database connection
connection();

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

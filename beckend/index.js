const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors")
const PORT = 5000 || process.env.PORT;
const connection = require("./databse/bd")
const multer = require("multer")
const fs = require('fs');
const path = require("path")
const Avatar = require("./models/userAvatar")
const USERMODEL = require("./models/userModel");
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")



app.use(cookieParser())


// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend's URL
  credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1", require("./routes/userRoutes"))
app.use("/api/v1/admin", require("./routes/adminRoutes"))
app.use("/api/v1/seller", require("./routes/sellerRoutes"))
app.use("/api/v1/product", require("./routes/productRoutes"))
app.use("/api/v1/cart", require("./routes/cartRoutes"))
app.use("/api/v1/wishlist", require("./routes/wishlistRoute"))
app.use(express.static("uploads"))

// app.use(notFound)
// app.use(errorHandler)

// Set up multer for file upload

// Set up multer storage
const storage = multer.diskStorage({
  destination:"./uploads",
  filename:(req, file, cb)=>{
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname)) // Use the original filename for the uploaded file
  }
});

// Set up multer middleware
const upload = multer({ storage: storage  });

// Define a POST route for uploading images
// app.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//       const { filename, path, contentType } = req.file;

//       const newImage = new Avatar({
//           filename,
//           path,
//           contentType
//       });

//       await newImage.save();

//       res.json({ message: 'Image uploaded successfully!' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error uploading image' });
//   }
// });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const _id = req.body;
    const user = await USERMODEL.findById(_id)

      const { filename, path ,mimetype } = req.file;

      const newImage = new Avatar({
          filename,
          path,
          mimetype,
          email:req.body.email
      });
       user.avatar = filename;

      await user.save();
      await newImage.save();

      res.json({user:{
        id:user._id,
        username:user.username,
        email:user.email,
        createdAt:user.createdAt,
        phone:user.phone,
        avatar:user.avatar,
        verified:user.verified,
        country:user.country,
        state:user.state,
        phone2:user.phone2,
        role:user.role,
        isActive:user.isActive,
        isAdmin:user.isAdmin,
        isSeller:user.isSeller,
      }});
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error uploading image' });
  }
});


// get images by email
app.get("/photo/:email", async(req,res)=>{
  try {
    const email = req.params.email;
    const user = await USERMODEL.findOne({email})
    if(!user){
      return res.json({err:"no image found "})
    }
    res.json({avatar:user.avatar})
  } catch (error) {
    console.log(error.message);
  }
})



connection();
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})

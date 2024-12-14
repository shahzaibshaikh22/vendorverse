const express = require("express");
const multer = require("multer");
const authenticateToken = require("../middleware/authenticte");
const { newProduct, getAllProducts, getSingleProduct, checkCoupon } = require("../controllers/productController");
const adminAuthenticate = require("../middleware/adminMiddleware");
const sellerAuthenticate = require("../middleware/isSeller");
const route = express.Router();


// add new product for super admin

// / Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/productimgs"); // Directory to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


route.post("/add",authenticateToken, adminAuthenticate, upload.array("images", 5), newProduct )

// get all products for display
route.get("/all", getAllProducts)

// get single product
route.get("/single/:id", getSingleProduct)

// check coupon code
route.post("/check-coupon", authenticateToken, checkCoupon)



module.exports = route;
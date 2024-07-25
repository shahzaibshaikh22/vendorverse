const express = require("express");
const authenticateToken = require("../middleware/authenticte");
const { newProduct, getAllProducts, getSingleProduct, checkCoupon } = require("../controllers/productController");
const adminAuthenticate = require("../middleware/adminMiddleware");
const sellerAuthenticate = require("../middleware/isSeller");
const route = express.Router();


// add new product for super admin
route.post("/add",authenticateToken, adminAuthenticate, newProduct )

// get all products for display
route.get("/all", getAllProducts)

// get single product
route.get("/single/:id", getSingleProduct)

// check coupon code
route.post("/check-coupon", authenticateToken, checkCoupon)



module.exports = route;
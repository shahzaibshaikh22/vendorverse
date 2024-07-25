const express = require("express")
const route = express.Router()
const authenticateToken = require("../middleware/authenticte");
const { addToWhishlist } = require("../controllers/wishlistController");


// route.post("/add", addToWhishlist)



module.exports = route;
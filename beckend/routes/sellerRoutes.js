const express = require("express");
const authenticateToken = require("../middleware/authenticte");
const { registerSeller } = require("../controllers/sellerController");
const route = express.Router();


// seller registration
route.post("/register",registerSeller )


module.exports = route;
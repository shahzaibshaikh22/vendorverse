const express = require("express");
const { addToCart, deleteCartItem, addToWhishlist, getCartItems, increaseQuantity, decreaseQuantity, getTotalPrice, deleteWishlistItem, getWishlistItems } = require("../controllers/cartController");
const authenticateToken = require("../middleware/authenticte");
const route = express.Router();

route.post('/add', authenticateToken, addToCart)
route.post('/addWishlist', authenticateToken, addToWhishlist)
route.post('/delete', authenticateToken, deleteCartItem)
route.post('/deleteWishlist', authenticateToken, deleteWishlistItem )
route.get('/items/:userId', authenticateToken, getCartItems)
route.get('/itemsWishlist/:userId', authenticateToken, getWishlistItems)
route.get('/total/:userId', authenticateToken, getTotalPrice)
route.post('/item/increase',authenticateToken, increaseQuantity)
route.post('/item/decrease',authenticateToken, decreaseQuantity)
// route.get('/singleProduct', authenticateToken, getSingleItem)

module.exports = route
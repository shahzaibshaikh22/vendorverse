const Cart = require("../models/cart")
const WishList = require("../models/wishList")
const Products = require("../models/products")
const USERMODEL = require("../models/userModel")


// add product in cart
const addToCart = async (req,res)=>{
    const { productId, quantity } = req.body;

    try {
        let {userId} = req.body
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId: req.user.id,
                items: [{ productId, quantity }],
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                productItem.quantity = quantity;
                // cart.items[itemIndex] = productItem;
                const existProduct =  cart.items[itemIndex] = productItem;
                if(existProduct){
                    return res.json({err: "product already in cart"})
                }
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// get the user's cart items
const getCartItems = async (req, res) => {
    try {
        const { userId } = req.params
        console.log(userId);
        const  cart = await  Cart.findOne( {userId} )
        if (!cart) {
            return res.status(404).json({ err: 'Cart is empty' });
        }
       return res.status(200).json(cart.items);
    } catch (error) {
        return res.json({err:error.message})
    }
}

// get the user's wishlist items
const getWishlistItems = async (req, res) => {
    try {
        const { userId } = req.params
        const  wishlist = await  WishList.findOne( {userId} )
        if (!wishlist) {
            return res.status(404).json({ err: 'wishlist is empty' });
        }
       return res.status(200).json(wishlist.items);
    } catch (error) {
        return res.json({err:error.message})
    }
}

// increase quantity of product in user cart
const increaseQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.json({err:"cart not found"})
        }
        const itemIndex = cart.items.findIndex(item=> item.id.toString() === productId)
        if(itemIndex > -1){
            cart.items[itemIndex].quantity += 1;
            await cart.save()
            return res.json(cart)
        }
    } catch (error) {
        return res.json({err:error.message})
    }
}
// increase quantity of product in user cart

// decrease quantity of product in user cart
const decreaseQuantity = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({userId})
        if(!cart){
            return res.json({err:"cart not found"})
        }
        const itemIndex = cart.items.findIndex(item=> item.id.toString() === productId)
        if(itemIndex > -1){
            cart.items[itemIndex].quantity -= 1;
            if(cart.items[itemIndex].quantity < 1){
                return res.json({err:"quantity can not be less than 1"})
            }
            await cart.save()
            return res.json(cart)
        }
    } catch (error) {
        return res.json({err:error.message})
    }
}
// decrease quantity of product in user cart

// add to wishlist of user
const addToWhishlist = async (req,res)=>{
    const { productId, userId, createdAt } = req.body;

    try {
        let wishlist = await WishList.findOne({ userId });

        if (!wishlist) {
            wishlist = new WishList({
                userId,
                items: [{ productId, createdAt: new Date() }],
            });
        } else {
            const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                let existProduct = wishlist.items[itemIndex];
                existProduct.createdAt = new Date()
                const existProduc =  wishlist.items[itemIndex] = existProduct;
                if(existProduc){
                    return res.json({err: "product already in wishlist"})
                }
            } else {
                wishlist.items.push({ productId, createdAt: new Date() });
            }
        }

        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Delete product from cart
const deleteCartItem = async (req,res)=>{
    
    try {
        const {productId, userId} = req.body
        let cart = await Cart.findOne({ userId });
        
        if(!cart) {
            return res.status(404).json({ err: 'Cart not found' });
            }
            // Use filter to create a new array without modifying the original cart
            const filteredCartItems = cart.items.findIndex(i=> i.productId.toString() === productId);
            if(filteredCartItems > -1){
                cart.items.splice(filteredCartItems, 1);
                await cart.save()
                return res.json(cart)
            }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// Delete product from wishlist
const deleteWishlistItem = async (req,res)=>{
    
    try {
        const {productId, userId} = req.body
        let wishlist = await WishList.findOne({ userId });
        
        if(!wishlist) {
            return res.status(404).json({ err: 'wishlist not found' });
            }
            // Use filter to create a new array without modifying the original cart
            const filteredCartItems = wishlist.items.findIndex(i=> i.productId.toString() === productId);
            if(filteredCartItems > -1){
                wishlist.items.splice(filteredCartItems, 1);
                await wishlist.save()
                return res.json(wishlist)
            }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// get tottal price of cart
const getTotalPrice = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find the cart for the given user and populate the product details
      const cart = await Cart.findOne({ userId }).populate('items.productId');
        console.log(cart);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Calculate the total price
      const totalPrice = cart.items.reduce((total, item) => {
        return total + item.productId.price * item.quantity;
      }, 0);
  
     return  res.json(totalPrice);
    } catch (error) {
      console.error('Error calculating total price:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }


module.exports = {
    addToCart,
    deleteCartItem,
    getCartItems,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    addToWhishlist,
    deleteWishlistItem,
    getWishlistItems
}
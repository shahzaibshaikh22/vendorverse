const Cart = require("../models/cart")
const WishList = require("../models/wishList")
const Products = require("../models/products")
const USERMODEL = require("../models/userModel")


// add product in cart
// const addToCart = async (req,res)=>{
//     const { productId, quantity } = req.body;

//     try {
//         let {userId} = req.body
//         let cart = await Cart.findOne({ userId });

//         if (!cart) {
//             cart = new Cart({
//                 userId: req.user.id,
//                 items: [{ productId, quantity }],
//             });
//         } else {
//             const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
//             if (itemIndex > -1) {
//                 let productItem = cart.items[itemIndex];
//                 productItem.quantity = quantity;
//                 // cart.items[itemIndex] = productItem;
//                 const existProduct =  cart.items[itemIndex] = productItem;
//                 if(existProduct){
//                     return res.json({err: "product already in cart"})
//                 }
//             } else {
//                 cart.items.push({ productId, quantity });
//             }
//         }

//         await cart.save();
//         res.status(200).json(cart);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// }
// const addToCart = async (req, res) => {
//   const { productId, quantity, sellerId } = req.body;

//   try {
//     let { userId } = req.body; // Frontend should pass userId
//     let cart = await Cart.findOne({ userId });

//     // If cart doesn't exist, create a new cart
//     if (!cart) {
//       cart = new Cart({
//         userId: req.user.id,
//         sellers: [
//           {
//             sellerId,
//             items: [{ productId, quantity }], // Add the product with initial quantity
//           },
//         ],
//       });
//     } else {
//       // Check if the seller already exists in the cart
//       const sellerIndex = cart.sellers.findIndex(
//         (seller) => seller.sellerId.toString() === sellerId
//       );

//       if (sellerIndex > -1) {
//         // Seller already exists, check for the product in the seller's items
//         const productIndex = cart.sellers[sellerIndex].items.findIndex(
//           (item) => item.productId.toString() === productId
//         );

//         if (productIndex > -1) {
//           // If the product is already in the cart, update quantity
//           cart.sellers[sellerIndex].items[productIndex].quantity += quantity; // Update quantity
//         } else {
//           // Product doesn't exist, add it to the seller's items
//           cart.sellers[sellerIndex].items.push({ productId, quantity });
//         }
//       } else {
//         // Seller doesn't exist, add a new seller with the product
//         cart.sellers.push({
//           sellerId,
//           items: [{ productId, quantity }],
//         });
//       }
//     }

//     // Remove the product from the wishlist
//     const wishProduct = await WishList.findOne({ userId });
//     if (wishProduct) {
//       const productIndex = wishProduct.items.findIndex(
//         (item) => item.productId.toString() === productId
//       );

//       if (productIndex > -1) {
//         // Remove the product from the wishlist
//         wishProduct.items.splice(productIndex, 1);
//         await wishProduct.save();
//       }
//     }

//     // Save the updated cart
//     await cart.save();
//     res.status(200).json({ message: "Product added to cart and removed from wishlist.", cart });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const addToCart = async (req, res) => {
  const { productId, quantity, sellerId } = req.body;

  try {
    let { userId } = req.body; // Frontend should pass userId
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Cart doesn't exist, create a new cart
      cart = new Cart({
        userId: req.user.id,
        sellers: [
          {
            sellerId,
            items: [{ productId, quantity }], // Add the product with initial quantity
          },
        ],
      });
    } else {
      // Check if the seller already exists in the cart
      const sellerIndex = cart.sellers.findIndex(
        (seller) => seller.sellerId.toString() === sellerId
      );

      if (sellerIndex > -1) {
        // Seller exists, check for the product in the seller's items
        const productIndex = cart.sellers[sellerIndex].items.findIndex(
          (item) => item.productId.toString() === productId
        );

        if (productIndex > -1) {
          // If the product is already in the cart, send a message
          return res
            .status(400)
            .json({ message: "This product is already in the cart." });
        } else {
          // Product doesn't exist, add it to the seller's items
          cart.sellers[sellerIndex].items.push({ productId, quantity });
        }
      } else {
        // Seller doesn't exist, add a new seller with the product
        cart.sellers.push({
          sellerId,
          items: [{ productId, quantity }],
        });
      }
    }

    // Remove the product from the wishlist
    const wishProduct = await WishList.findOne({ userId });
    if (wishProduct) {
      const productIndex = wishProduct.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        // Remove the product from the wishlist
        wishProduct.items.splice(productIndex, 1);
        await wishProduct.save();
      }
    }

    // Save the updated cart
    await cart.save();
    res
      .status(200)
      .json({
        message: "Product added to cart and removed from wishlist.",
        cart,
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};



// get the user's cart items
// const getCartItems = async (req, res) => {
//     try {
//         const { userId } = req.params
//         const  cart = await  Cart.findOne( {userId} )
//         if (!cart) {
//             return res.status(404).json({ err: 'Cart is empty' });
//         }
//        return res.status(200).json(cart.items);
//     } catch (error) {
//         return res.json({err:error.message})
//     }
// }
const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId })
      .populate({
        path: 'sellers.items.productId',
        select: 'price name', // Sirf zaruri fields populate karein
      });

    if (!cart) {
      return res.status(200).json({ message: "Cart not found for the given user." });
    }

    // Total price calculate karna
    let totalPrice = 0;
    cart.sellers.forEach(seller => {
      seller.items.forEach(item => {
        const productPrice = item.productId?.price || 0; // Product price
        totalPrice += productPrice * item.quantity; // Price x Quantity
        cart.totalPrice = totalPrice
      });
    });

    res.status(200).json({
      cart,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};



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
// const increaseQuantity = async (req, res) => {
//     try {
//         const { userId, productId } = req.body;
//         const cart = await Cart.findOne({userId})
//         if(!cart){
//             return res.json({err:"cart not found"})
//         }
//         const itemIndex = cart.items.findIndex(item=> item.id.toString() === productId)
//         if(itemIndex > -1){
//             cart.items[itemIndex].quantity += 1;
//             await cart.save()
//             return res.json(cart)
//         }
//     } catch (error) {
//         return res.json({err:error.message})
//     }
// }
const increaseQuantity = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found for the given user." });
    }

    // Product search karke quantity increase karna
    let productFound = false;

    cart.sellers.forEach(seller => {
      seller.items.forEach(item => {
        if (item.productId.toString() === productId) {
          item.quantity += 1; // Increase quantity
          productFound = true;
        }
      });
    });

    if (!productFound) {
      return res.status(404).json({ error: "Product not found in cart." });
    }

    // Total price update karna
    let totalPrice = 0;
    cart.sellers.forEach(seller => {
      seller.items.forEach(item => {
        totalPrice += (item.productId.price || 0) * item.quantity;
      });
    });

    cart.totalPrice = totalPrice;

    await cart.save();

    res.status(200).json({ message: "Quantity increased successfully!", cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

// increase quantity of product in user cart

// decrease quantity of product in user cart
// const decreaseQuantity = async (req, res) => {
//     try {
//         const { userId, productId } = req.body;
//         const cart = await Cart.findOne({userId})
//         if(!cart){
//             return res.json({err:"cart not found"})
//         }
//         const itemIndex = cart.items.findIndex(item=> item.id.toString() === productId)
//         if(itemIndex > -1){
//             cart.items[itemIndex].quantity -= 1;
//             if(cart.items[itemIndex].quantity < 1){
//                 return res.json({err:"quantity can not be less than 1"})
//             }
//             await cart.save()
//             return res.json(cart)
//         }
//     } catch (error) {
//         return res.json({err:error.message})
//     }
// }
const decreaseQuantity = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found for the given user." });
    }

    // Product search karke quantity decrease karna
    let productFound = false;
    let minimumQuantityReached = false;

    cart.sellers.forEach((seller) => {
      seller.items = seller.items.map((item) => {
        if (item.productId.toString() === productId) {
          if (item.quantity > 1) {
            item.quantity -= 1; // Decrease quantity
            productFound = true;
          } else {
            // If quantity is already 1, do not decrease further
            minimumQuantityReached = true;
          }
        }
        return item; // Return the item even if quantity is not decreased
      });
    });

    if (!productFound && !minimumQuantityReached) {
      return res.status(404).json({ error: "Product not found in cart." });
    }

    if (minimumQuantityReached) {
      return res.status(200).json({
        err: "Minimum quantity is 1. Quantity cannot be decreased further.",
      });
    }

    // Total price update karna
    let totalPrice = 0;
    cart.sellers.forEach((seller) => {
      seller.items.forEach((item) => {
        totalPrice += (item.productId.price || 0) * item.quantity;
      });
    });

    cart.totalPrice = totalPrice;

    await cart.save();

    res
      .status(200)
      .json({ message: "Quantity decreased successfully!", cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};


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
// const deleteCartItem = async (req,res)=>{
    
//     try {
//         const {productId, userId} = req.body
//         let cart = await Cart.findOne({ userId });
        
//         if(!cart) {
//             return res.status(404).json({ err: 'Cart not found' });
//             }
//             // Use filter to create a new array without modifying the original cart
//             const filteredCartItems = cart.items.findIndex(i=> i.productId.toString() === productId);
//             if(filteredCartItems > -1){
//                 cart.items.splice(filteredCartItems, 1);
//                 await cart.save()
//                 return res.json(cart)
//             }
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// }
const deleteCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Find and update the cart by pulling the product
    const updatedCart = await Cart.findOneAndUpdate(
      { userId }, // Find cart by userId
      { $pull: { 'sellers.$[].items': { productId } } }, // Pull product by productId
      { new: true } // Return updated document
    ).populate({
      path: 'sellers.items.productId',
      select: 'price name', // Only necessary fields
    });

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart or product not found." });
    }

    // Recalculate total price
    let totalPrice = 0;
    updatedCart.sellers.forEach((seller) => {
      seller.items.forEach((item) => {
        const productPrice = item.productId?.price || 0;
        totalPrice += productPrice * item.quantity;
      });
    });

    // If the cart is empty (no items left), delete the cart
    const isEmptyCart = updatedCart.sellers.every((seller) => seller.items.length === 0);
    if (isEmptyCart) {
      await Cart.findOneAndDelete({ userId });
      return res.status(200).json({ message: "Cart is empty and has been deleted." });
    }

    // Save the updated cart
    updatedCart.totalPrice = totalPrice;
    await updatedCart.save();

    res.status(200).json({
      message: "Product removed successfully.",
      cart: updatedCart,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};



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
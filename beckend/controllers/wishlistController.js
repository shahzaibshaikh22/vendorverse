const WishList = require("../models/wishList")

// const addToWishlist = async (req,res)=>{
//     const { productId, userId } = req.body;

//     try {
//         let wishlist = await WishList.findOne({ userId });

//         if (!wishlist) {
//             wishlist = new WishList({
//                 userId,
//                 items: [{ productId, createAt: new Date.now() }],
//             });
//         } else {
//             const itemIndex = wishlist.items.findIndex(item => item.productId.toString() === productId);
//             if (itemIndex > -1) {
//                 let productItem = wishlist.items[itemIndex];
//                 // wishlist.items[itemIndex] = productItem;
//                 const existProduct =  wishlist.items[itemIndex] = productItem;
//                 if(existProduct){
//                     return res.json({err: "product already in wishlist"})
//                 }
//             } else {
//                 wishlist.items.push({ productId ,createAt: new Date.now() });
//             }
//         }

//         await wishlist.save();
//         res.status(200).json(wishlist);
//     } catch (err) {
//         res.send('Server error');
//     }
// }


const addToWishlist = async(req,res)=>{
    res.send("hello")
}
module.exports = {
    addToWishlist
}

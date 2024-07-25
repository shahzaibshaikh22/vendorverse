
const mongoose = require('mongoose');


const WishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USERMODEL',
    required: true,
  },
  items: [
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          createdAt:{
            type:Date,
            default:Date.now
          },
    }
  ],
});

const Wishlist = mongoose.model('Wishlist', WishListSchema);

module.exports = Wishlist;

// const mongoose = require('mongoose');


// const CartSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'USERMODEL',
//     required: true,
//   },
//   items: [
//     {
//         productId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true,
//           },
//           quantity: {
//             type: Number,
//             default: 1,
//           },
//           // createdAt:{
//           //   type:Date,
//           //   default:Date.now
//           // },
//     }
//   ],
//   totalPrice:{
//     type:Number,
//     default:0
//   }
// });

// const Cart = mongoose.model('Cart', CartSchema);

// module.exports = Cart;

const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USERMODEL',
    required: true,
  },
  sellers: [
    {
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', // Seller model reference
        required: true,
      },
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        }
      ],
    }
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;

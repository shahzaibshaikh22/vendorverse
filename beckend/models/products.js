const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    warentyType: {
        type: String,
        default: "warrenty"
    },
    isSale:{
        type:Boolean,
        default:false
    },
    featured: {
        type: Boolean,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'USERMODEL',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    location:{
        type:String,
        required:true
    },
    images: [{ type: String, required: true }],
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    couponCode:{
        type:String,
        default:''
      },
    discountPercentage:{
        type:Number,
        default:0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Products =  mongoose.model("Product", productSchema);
module.exports = Products;
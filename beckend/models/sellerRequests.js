const mongoose = require("mongoose")

const sellerRequest =  mongoose.Schema({
    requestId:{
        type: mongoose.Schema.Types.ObjectId,
                ref: 'usermodels',
                required: true
    },
    username:String,
    email:String,
    phone:Number,
    country:String,
    state:String,
    city:String,
    storeName:String,
    role: {
        type: String,
        default: 'selleradmin'
      },
      sellerStatus:{
        type:String,
        default:"pending"
    },
    step:{
        type:Number,
        default:0
    },
    payment:{
        type:String,
        default:"pending"
    },
    isActive:{
        type:String,
        default:"unActive"
    },
    verified:{
        type:Boolean,
        default:false
    },
    avatar:{
        type:String,
        default:null
    },
    createdAt:String
})
const SellerRequests =  mongoose.model("SellerRequest", sellerRequest);
module.exports = SellerRequests;
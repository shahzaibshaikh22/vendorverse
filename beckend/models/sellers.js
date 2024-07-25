const mongoose = require("mongoose")

const sellerSchema =  mongoose.Schema({
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usermodels"
    }
})
const Sellers =  mongoose.model("Seller", sellerSchema);
module.exports = Sellers;
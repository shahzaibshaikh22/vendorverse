const Sellers = require("../models/sellers");
const USERMODEL = require("../models/userModel");
const SellerRequests = require("../models/sellerRequests");
const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")



const registerSeller = asyncHandler(async (req,res)=>{
   try {
    const { email,username,storeName,country,state,city,phone } = req.body;
    
    const user = await USERMODEL.findOne({email});
    const seller = await Sellers.findOne({email});
    if(seller){
        return res.json({err:"Seller already exists...!"});
    }
    const requestUser = await USERMODEL.findOne({email});
    if(!requestUser){
        return res.json({err:"user not registered...!", staus:400})
    }
    
    const newRequest = new SellerRequests({
        requestId:requestUser._id,
        email,
        username,
        storeName,
        country,
        state,
        city,
        phone,
    })
    await newRequest.save();
    return res.json({msg:"Your request has been is submited", status:200})
   } catch (error) {
       return res.json({err:error.message})
   }
})



module.exports = {
    registerSeller
}

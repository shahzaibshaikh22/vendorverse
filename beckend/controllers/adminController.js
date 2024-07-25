const USERMODEL = require("../models/userModel");
const sellerRequests = require("../models/sellerRequests");
const Sellers = require("../models/sellers");


// get all users
const getAllUsers = async(req,res)=>{
    try {
        const users = await USERMODEL.find().select('-password')
        return res.status(200).json({users})
    } catch (error) {
        res.status(400).json({err:"No Users Found"})
    }
}

// get single user
const getUser = async (req,res)=>{
    try {
        const _id = req.params.id;
        const user = await USERMODEL.findById(_id)
        if(user){
            return res.status(200).json({user})
        }
        else return res.status(400).json({err:"user not found"})
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

// delete single user
const deleteUser = async (req,res)=>{
    try {
        const _id = req.params.id;
        const user = await USERMODEL.findById(_id)
        if(user){
            return res.status(200).json({user})
        }
        else return res.status(400).json({err:"user not found"})
    } catch (error) {
        res.status(400).json({err:error.message})
    }
}

// get all become seller requests
const getAllRequests = async(req,res) =>{
    try {
        const requests = await sellerRequests.find();
        if(requests.length >0){
            return res.status(200).json({requests})
        }
        else{
            return res.status(400).json({err:"No requests found"})
        }
    } catch (error) {
        return res.status(400).json({err:error.message})
    }
}

// approve seller request 
const approveRequest = async (req,res)=>{
    try {
        const { _id } = req.body
        const request = await sellerRequests.findById(_id)
        const seller = await USERMODEL.findById(request.requestId)
        if(!request && !seller){
            return res.json({err:"something went wrong"})
        }
        request.sellerStatus = "approved"
        seller.step = 1
        await request.save()
        await seller.save()
         return res.json({msg:"seller request is approved"})
    } catch (error) {
        return res.json({err:error.message})
    }
}

// approve seller payment 
const approvePayment = async (req,res)=>{
    try {
        const { _id } = req.body
        const request = await sellerRequests.findById(_id)
        const seller = await USERMODEL.findById(request.requestId)
        if(!request && !seller){
            return res.json({err:"something went wrong"})
        }
        request.payment = "approved"
        seller.step = 2
        await request.save()
        await seller.save()
         return res.json({msg:"seller payment is approved"})
    } catch (error) {
        return res.json({err:error.message})
    }
}

// approve seller as a seller 
const approveSeller = async (req,res)=>{
    try {
        const { _id } = req.body
        const request = await sellerRequests.findById(_id)
        const seller = await USERMODEL.findById(request.requestId)
        if(!request && !seller){
            return res.json({err:"something went wrong"})
        }
        request.verified = true
        seller.step = 3
        seller.isSeller = true
        await request.save()
        await seller.save()
        const newSeller = new Sellers({
            sellerId:seller._id
        })
        await newSeller.save()
         return res.json({msg:"seller has been approved"})
    } catch (error) {
        return res.json({err:error.message})
    }
}


module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    getAllRequests,
    approveRequest,
    approvePayment,
    approveSeller
}
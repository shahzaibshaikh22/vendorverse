const USERMODEL = require("../models/userModel");


const adminAuthenticate = async(req,res, next) =>{
    try {
        const user = await USERMODEL.findById(req.user._id)
        if(user.isAdmin){
            next()
        }
        else{
            return res.status(403).json({err:"Access Denied...."})
        }
    } catch (error) {
        next(error.message)
    }
}

module.exports = adminAuthenticate
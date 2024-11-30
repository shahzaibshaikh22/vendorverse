const mongoose = require("mongoose")

const userScheme =  mongoose.Schema({
    username:String,
    email:String,
    password:String,
    confirmPassword:String,
    phone:Number,
    phone2:{
        type:Number,
        default:null
    },
    country:String,
    state:{
        type:String,
        default:""
    },
    role: {
        type: String,
        default: 'useradmin'
      },
      step:{
        type:Number,
        default:0
    },
    isActive:{
        type:String,
    },
    verified:{
        type:Boolean,
        default:false
    },
    isSeller:{
        type:Boolean,
        default:false
    },
    isApplied:{
        type:Boolean,
        default:false
    },

    isAdmin:{
        type:Boolean,
        default:false
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otp:String,
    avatar:{
        type:String,
        default:null
    },
    createdAt:String
})
const USERMODEL =  mongoose.model("USERMODEL", userScheme);
module.exports = USERMODEL;
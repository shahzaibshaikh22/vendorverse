const USERMODEL = require("../models/userModel");
const bcrypt = require("bcryptjs")
const optGenerator = require("otp-generator")
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {generateToken} = require("../utils/GenerateToken")



// nodemailer authetication 

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass:process.env.MY_PASS
    }
  });

//   send opt to user email
function sendOTPEmail(email, otp) {
    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: 'Your OTP for Verification',
      text: `Your OTP is: ${otp}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }



// registration route for user
// const userRegister = async (req,res)=>{
//     try {
//         const {username, email, password, confirmPassword, phone,country} = req.body;
//         const user = await USERMODEL.findOne({email})

//         if(!username || !email || !password || !confirmPassword){
//             res.json({err:"all field are required"});
//         }

//         if(user){
//             res.json({err:"user already exist"});
//         }
//         if(password !== confirmPassword){
//           return res.json({err:"password not matched"})
//         }
//        if(!user){
//         // Generate a 6-digit numeric OTP
//         const otp =  optGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
//         sendOTPEmail(email,otp);
//         const hashpass = await bcrypt.hash(password, 10)
//         const newuser = new USERMODEL({
//             username,
//             email,
//             phone,
//             country,
//             password:hashpass,
//             createdAt:new Date().toISOString(),
//             otp,
//             avatar:"",
//             otpExpiry:Date.now() + 1 * 60 * 1000 // OTP valid for 1 minutes
//         });
        
//         const saveUser = await newuser.save();
//         return res.json({user:saveUser});
//        }

//     } catch (error) {
//        return res.json({err:error.message});
//     }
// }

const userRegister = asyncHandler(async (req, res) => {
  try {
      const { username, email, password, confirmPassword, state, phone2, phone, country } = req.body;
      const user = await USERMODEL.findOne({ email });

      if (!username || !email || !password || !confirmPassword) {
          return res.json({ err: "All fields are required" });
      }

      if (user) {
          return res.json({ err: "User already exists" });
      }

      if (password !== confirmPassword) {
          return res.json({ err: "Passwords do not match" });
      }

      // Generate a 6-digit numeric OTP
      const otp =  optGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
      sendOTPEmail(email, otp);

      const hashpass = await bcrypt.hash(password, 10)
      const newuser = new USERMODEL({
          username,
          email,
          phone,
          country,
          password: hashpass,
          createdAt: new Date().toISOString(),
          otp,
          isActive:"",
          avatar: "",
          state,
          phone2,
          otpExpiry: Date.now() + 1 * 60 * 1000 // OTP valid for 1 minute
      });

      const saveUser = await newuser.save();
      return res.json({ user: saveUser });

  } catch (error) {
      return res.json({ err: error.message });
  }
})

// login route for user
const userLogin = async (req,res)=>{
  try {
    const {email, password} = req.body;
    const user = await USERMODEL.findOne({email});
    if(!user){
      res.json({err:"user not found"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(user){
      if(isMatch){
        if(user.verified !== false){
          // generateToken(res, user._id)
          const token = jwt.sign({_id:user._id}, process.env.SECRETE_KEY, { expiresIn: '30d' })
          res.cookie('jwt', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 24 * 60 * 60 * 1000,
          })
          user.isActive = "online"
        await user.save();
       return res.status(200).json({user:{
          _id:user._id,
          username:user.username,
          email:user.email,
          createdAt:user.createdAt,
          phone:user.phone,
          phone2:user.phone2,
          role:user.role,
          country:user.country,
          state:user.state,
          avatar:user.avatar,
          isActive:user.isActive,
          isSeller:user.isSeller,
          step:user.step,
          isAdmin:user.isAdmin
        }});
        }else{
          return res.json({err:"please verify your email"})
        }
      }
      res.json({err:"Invalid credintials"})
    }
  } catch (error) {
    
  }
}


// logout function 

const logout = async (req,res)=>{
  const id = req.user._id
  const user = await USERMODEL.findById(id)
  if(!id){
    return res.status(400).json({err:"user not found"})
  }
  if(user){
    res.cookie('jwt', '');
    return res.json({msg:"logged out!"})
  }
}


// verify otp route
const verifyOtp = async (req,res)=>{
  try {
    const { email, otp } = req.body;
    const user = await USERMODEL.findOne({email});
    if (!user) {
      return res.json({ err: 'User not found' });
    }
    if(!otp){
      return res.json({ err: 'User not found' });
    }

     // Check if the OTP has expired
     if (user.otpExpiry < Date.now()) {
      return res.json({ err: 'OTP has expired' });
    }

      // Check if the entered OTP matches the one stored in the database
      if (otp !== user.otp) {
        return res.json({ err: 'Invalid OTP' });
      }

     // Update the user as verified
     user.verified = true;
     await user.save();
 
    return res.json({ msg: 'User verified successfully' });
  } catch (error) {
    res.json({err:error.message});
  }
}

// resend otp
const resendOtp = async (req,res)=>{
  try {
    const { email } = req.body;
    const user = await USERMODEL.findOne({email});
    if(!user){
      res.json({err:"Invalid credintials"})
    }
    if(user){
      const otp =  optGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
       user.otp = otp;
       user.otpExpiry = Date.now() + 1 * 60 * 1000 // OTP valid for 1 minutes
      await user.save();
      sendOTPEmail(email,otp);
      res.json({msg:"new otp has been sent to your email"});
    }
  } catch (error) {
    res.json({err:error.message});
  }
}

// switch role user to seller or seller to user 

const switchRole = async (req,res)=>{
  try {
    const { email } = req.user;
    const user = await USERMODEL.findOne({email})
    if(!user){
      return res.json({err:"user not found"})
    }
    const  checkRole = user.role === "useradmin" ? user.role = "selleradmin" : user.role = "useradmin" || user.role === "superadmin" ? user.role = 'useradmin' : user.role = 'superadmin'

     await user.save();
     return res.json({user:{
      _id:user._id,
      username:user.username,
      email:user.email,
      createdAt:user.createdAt,
      phone:user.phone,
      phone2:user.phone2,
      role:user.role,
      country:user.country,
      state:user.state,
      avatar:user.avatar,
      isSeller:user.isSeller,
      verified:user.verified,
      isAdmin:user.isAdmin,
      isActive:user.isActive = "online",
     }}) 
  } catch (error) {
    res.json({err:error.message})
  }
}
const switchRoleAdmin = async (req,res)=>{
  try {
    const { email } = req.user;
    const user = await USERMODEL.findOne({email})
    if(!user){
      return res.json({err:"user not found"})
    }
    const  checkRole =  user.role === "superadmin" ? user.role = 'useradmin' : user.role = 'superadmin'

     await user.save();
     return res.json({user:{
      _id:user._id,
      username:user.username,
      email:user.email,
      createdAt:user.createdAt,
      phone:user.phone,
      phone2:user.phone2,
      role:user.role,
      country:user.country,
      state:user.state,
      avatar:user.avatar,
      isSeller:user.isSeller,
      verified:user.verified,
      isAdmin:user.isAdmin,
      isActive:user.isActive = "online",
     }}) 
  } catch (error) {
    res.json({err:error.message})
  }
}

const userProfile = async(req,res)=>{
  try {
    const email = req.user.email;
    const user = await USERMODEL.findOne({ email }).select('-password'); 
    if(user){
      res.json(user)
    }else{
      res.json({err:"user not found"})
    }
  } catch (error) {
    res.json({err:error.message});
  }
}

// get the user and update
const updateProfile = async (req, res)=>{
  try {
   const user = await USERMODEL.findById(req.user._id)

   if(user){
    user.email = req.body.email || user.email
    user.username = req.body.username || user.username
    user.country = req.body.country || user.country
    user.state = req.body.state || user.state
    user.phone = req.body.phone || user.phone
    user.phone2 = req.body.phone2 || user.phone2

    if(req.body.password){
      const hashpass = await bcrypt.hash(req.body.password, 10)
      user.password = hashpass
    }

    if(req.body.password !== req.body.confirmPassword){
      return res.json({err:"password is not matched"})
    }
   const updatedUser =  await user.save()
    return  res.json({user:{
      _id:updatedUser._id,
      username:updatedUser.username,
      email:updatedUser.email,
      createdAt:updatedUser.createdAt,
      phone:updatedUser.phone,
      phone2:updatedUser.phone2,
      role:updatedUser.role,
      country:updatedUser.country,
      state:updatedUser.state,
      avatar:updatedUser.avatar,
      isSeller:updatedUser.isSeller,
      isActive:updatedUser.isActive = "online",
      isAdmin:updatedUser.isAdmin,
      step:updatedUser.step
    }})
  }
   return res.json({err:"user not found"})
  } catch (error) {
    return res.json({err:error.message})
  }
}



module.exports = {
    userLogin,
    userRegister,
    resendOtp,
    verifyOtp,
    userProfile,
    switchRole,
    switchRoleAdmin,
    updateProfile,
    logout
}
const express = require("express");
const { userLogin, userRegister, resendOtp, verifyOtp, userProfile, switchRole, updateProfile, getUser, logout, switchRoleAdmin } = require("../controllers/userController");
const route = express.Router();
const authenticateToken = require("../middleware/authenticte")

// route for register
route.post("/user/register", userRegister);

// route for login
route.post("/user/login", userLogin);

// verify otp
route.post("/user/verify-otp", verifyOtp);

// resend otp route
route.post("/user/resend-otp", resendOtp);

// get user profile route
route.get("/user/profile", authenticateToken, userProfile);

// route.get("/user/getuser", authenticateToken, getUser)

// switch user role 
route.post("/user/switch", authenticateToken, switchRole)
// switch admin role 
route.post("/user/admin/switch", authenticateToken,  switchRoleAdmin)

// update user profile
route.put("/user/update", authenticateToken, updateProfile)

// logout route 
route.post('/user/logout', authenticateToken, logout)


module.exports = route;
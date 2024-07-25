// Protected route that requires a valid JWT
// app.get('/protected', authenticateToken, (req, res) => {
//     res.json({ message: 'This is a protected route' });
//   });
// const jwt = require("jsonwebtoken")  
//   // Middleware to authenticate JWT
//   const  authenticateToken = (req, res, next)=>{
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
  
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
  
//     jwt.verify(token, process.env.SECRETE_KEY, (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: 'Forbidden' });
//       }
  
//       req.user = user;
//       next();
//     });
//   }


const jwt = require("jsonwebtoken");  
const USERMODEL = require("../models/userModel");



  // Middleware to authenticate JWT
  const  authenticateToken = async (req, res, next)=>{
    let token;
    token = req.cookies.jwt;
    if(token){
      try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY);
        req.user = await USERMODEL.findById(decoded._id, ).select("-password");
        next()
      } catch (error) {
        return res.json({err:"Invalid token"})
      }
    }
    else{
      return res.status(401).json({err:"Unauthorized"})
    }
  }

  module.exports = authenticateToken;
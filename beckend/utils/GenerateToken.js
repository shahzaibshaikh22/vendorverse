const jwt = require("jsonwebtoken")

  const generateToken = (res, userId) =>{
    const token = jwt.sign({userId}, process.env.SECRETE_KEY, { expiresIn: '30d' })

     res.cookie('jwt', token,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:60 * 24 *60 *60 *1000
      })
}

module.exports = generateToken


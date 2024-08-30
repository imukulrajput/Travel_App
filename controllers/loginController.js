const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const loginHandler = async (req,res)=>{
    try{
      const user = await User.findOne({number:req.body.number})
      !user && res.status(401).json({ message:"Incorrect Mobile Number" })

      const decodedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
       decodedPassword !==req.body.password && res.status(401).json({message:"Incorrect Password"});
        
       const { password, ...rest} = user._doc;//password httt jayega response se
       const accessToken = jwt.sign({username:user.username},process.env.ACCESS_TOKEN)

      res.json({...rest,accessToken});//we want only one single object as response so we did this otherwise if we (rest,accesToken) did this way it can create two object

    }catch(err){
          res.status(404).json({message:"Error in Login"});
    }
  }

module.exports = loginHandler;  
const jwt  = require("jsonwebtoken");
const Customer = require("../models/customerModel");


const authenticateCus = async(req,res,next)=>{
    try{
        // console.log(res.cookies)

        const token = req.cookies.jwtCusToken;

        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        var rootUser = await Customer.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootUser){
            throw new Error('User not Found');
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();

    }catch(err){
        res.status(401).send("Unauthorized : No token provided")
        console.log(err);
    }


}

module.exports = authenticateCus;
const jwt  = require("jsonwebtoken");
const Professional = require("../models/pro.model");


const authenticatePro = async(req,res,next)=>{
    try{
        // console.log(res.cookies)
        const token = req.cookies.jwtProToken;


        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
        var rootUser = await Professional.findOne({_id:verifyToken._id,"tokens.token":token});
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

module.exports = authenticatePro;
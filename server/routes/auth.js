const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require("../middleWare/authenticateCus")
const authenticatePro = require("../middleWare/authenticatePro")
require('../db/conn');

const Customer = require("../models/customerModel");
const Professional = require("../models/pro.model");
const Transaction  = require("../models/transactionModel")


router.get('/', (req, res) => {
    res.send('Hello world router js');
});

//using promises

// router.post('/signup-customer',(req,res)=>{

//     const { fullname, email, phoneNo,password ,cpassword,address,city,state,gender} = req.body;

//     if(!fullname || !email || !phoneNo || !password || !cpassword || !address || !city || !state || !gender){
//     return res.status(422).json({error: "Please fill the fields properly" });  
//     }
//     Customer.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//     return res.status(422).json({error: "Email already exist" });  
//         }

//         const user = new Customer({fullname, email, phoneNo,password ,cpassword,address,city,state,gender});
//         user.save().then(()=>{
//             res.status(201).json({message:"User added successfully in the database"});
//         }).catch((err)=> res.status(500).json({error:"Failed to add to the database"}))

//     }).catch(err=>{console.log(err)} );
// });




// using aysnc 

router.post('/signup-customer', async (req, res) => {

    const { name, email, phoneNo, password, cpassword, address, city, state, gender } = req.body;

    if (!name || !email || !phoneNo || !password || !cpassword || !address || !city || !state || !gender) {
        return res.status(422).json({ error: "Please fill the fields properly" });
    }
    try {
        const userExist = await Customer.findOne({ email: email });

        if (userExist) {
            return res.status(444).json({ error: "Email already exist" });
        }else if(phoneNo.length != 10){
            return res.status(455).json({ error: "Invalid Phone number" });

        }
         else if (password != cpassword) {
            return res.status(433).json({ error: "password are not matching" });
        } else {
            const user = new Customer({ name, email, phoneNo, password, cpassword, address, city, state, gender });
            const customerRegister = await user.save();
            res.status(201).json({ message: "User added successfully in the database" });
        }

    } catch (err) {
        console.log(err);
    }
});


router.post('/signup-pro', async (req, res) => {

    const { name, email, phoneNo, password, cpassword, address, city, state, profession, gender } = req.body;

    if (!name || !email || !phoneNo || !password || !cpassword || !address || !city || !state || !profession || !gender) {
        return res.status(422).json({ error: "Please fill the fields properly" });
    }
    try {
        const userExist = await Professional.findOne({ email: email });

        if (userExist) {
            return res.status(444).json({ error: "Email already exist" });
        }else if(phoneNo.length != 10){
            return res.status(455).json({ error: "Invalid Phone number" });

        }
        else if (password != cpassword) {
            return res.status(433).json({ error: "password are not matching" });
        }else{
            const user = new Professional({ name, email, phoneNo, password, cpassword, address, city, state, profession, gender });
        const professionalRegister = await user.save();
        res.status(201).json({ message: "User added successfully in the database" });
        }  
    } catch (err) {
        console.log(err);
    }
});
router.post('/confirm',async(req,res)=>{
    
    try{
        const {customer,professional} = req.body.putData
        // console.log(customer)
       const transaction = new Transaction({customer,professional})
       const transactionRegister = await transaction.save();
        res.status(201).json({ message: "Transaction added successfully in the database" });
}
    catch(err){
        console.log(err)
    }
})
// Login route

router.post('/login-signup', async (req, res) => {
    // console.log(req.body);
    // res.json({message:"cool"});
    try {
        let token
        var { email, password } = req.body;
        email = email.toLowerCase()

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }

        if (email == "admin" && password == "admin") {
            
            res.status(250).json({ message: "admin loged in successfully", user:"admin"})
            console.log(res)
            
            return res
        }
        let userLogin = await Customer.findOne({ email: email });
        // console.log(userLogin)
        // let isMatch = await bcrypt.compare(password, userLogin.password);
        if (!userLogin) {
            let userLogin = await Professional.findOne({ email: email });
            // let isMatch = await bcrypt.compare(password, userLogin.password);

            if (!userLogin) {
                res.status(400).json({ error: "Invalid user credentials" });
            } else {
                let isMatch = await bcrypt.compare(password, userLogin.password);
                 token = await userLogin.generateProAuthToken();
                 res.cookie("jwtProToken",token,{
                    expires:new Date(Date.now() + 25892000000),
                    httpOnly:true
                } );
                if(!isMatch){
                res.status(400).json({ error: "Invalid user credentials" });

                }else{
                    res.status(251).json({ message: "professional loged in successfully" });
                }

                
            }
        }
        else {
            let isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateCusAuthToken();
            // console.log(token)
            res.cookie("jwtCusToken",token,{
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            } );
            if(!isMatch){
                res.status(400).json({ error: "Invalid user credentials" });

                }else{
                    res.json({ message: "customer loged in successfully" });
                }
        }



    } catch (error) {
        console.log(error);
    }
})

router.get('/home',authenticate,(req,res)=>{
    res.send(req.rootUser);
});
router.get('/profile',authenticate,(req,res)=>{
    res.send(req.rootUser);
});
router.get('/reviews',authenticate,async(req,res)=>{
    // res.send(req.rootUser);
    const data = await Transaction.find({"customer.email" : req.rootUser.email})
    res.send(data)
});
router.post('/reviews',async(req,res)=>{
    // res.send(req.rootUser);
    const reviewText = req.body.reviewText
    const userReview = await Transaction.findOne({"professional.email":req.body.pro_email , "professional.tier_name":req.body.tier_name});
    // console.log(userReview);
    // console.log(req.body);

    if(userReview){
        const userReviewSent = await userReview.addReview(reviewText);
            await userReview.save();
        res.status(201).json({message:"user pro message added"})

    }
    
    const userPro = await Professional.findOne({"email":req.body.pro_email});
    if(userPro){
        const userProSent = await userPro.addReviews(userReview.customer.name,userReview.customer.email,userReview.customer.phoneNo,reviewText,userReview.professional.tier_name);
        await userPro.save();
        // res.status(201).json({message:"user pro message added"})

            
    }

    
});
router.post('/contact',authenticate,async(req,res)=>{
    try{
        const {name,email,message}=req.body;
        if(!name||!email||!message){
            console.log(("error in contact form"));
            return res.json({error:"please fill the contact form "});
        }
        const userContact = await Customer.findOne({_id:req.userID});
        if(userContact){
            const userMessage = await userContact.addMessage(name,email,message);
            await userContact.save();
            res.status(201).json({message:"user message added"})
        
        }
    }catch(e){
        console.log(e);
    }
});
router.post('/pro',authenticatePro,async(req,res)=>{
    try {
        const {tier1_name,tier1_price,tier1_details,tier2_name,tier2_price,tier2_details,tier3_name,tier3_price,tier3_details} = req.body;
        if(!tier1_name||!tier1_price||!tier1_details||!tier2_name||!tier2_price||!tier2_details||!tier3_name||!tier3_price||!tier3_details){
            console.log("error in professional tiers form")
            return res.json({error:"please fill the contact form "});
        }
        const userTiers = await Professional.findOne({_id:req.userID});
        if(userTiers){
            const userMessage = await userTiers.addTiers(tier1_name,tier1_price,tier1_details,tier2_name,tier2_price,tier2_details,tier3_name,tier3_price,tier3_details);
            await userTiers.save();
            res.status(201).json({message:"user message added"})
        
        }
        
    
    } catch (error) {
        console.log(error);
    }
})
router.get('/contact',authenticate,(req,res)=>{
    res.send(req.rootUser);
});
router.get('/confirm',authenticate,(req,res)=>{
    res.send(req.rootUser);
});
// router.get('/search',authenticate,(req,res)=>{
//     res.send(req.rootUser);
// });
router.get('/about-pro',authenticate,(req,res)=>{
    res.send(req.rootUser);
});
router.get('/pro',authenticatePro,(req,res)=>{
    res.send(req.rootUser);
});

router.get('/log-out',(req,res)=>{
    res.clearCookie('jwtCusToken')
    res.clearCookie('jwtProToken')

    res.status(200).send('user logout')
});
router.get('/admin/cusDetails',async(req,res)=>{
    const data = await Customer.find();
    res.send(data);
})
router.get('/admin/proVerify',async(req,res)=>{
    const data = await Professional.find();
    res.send(data);
})
router.get('/admin/cusReviews',async(req,res)=>{
    const data = await Customer.find();
    res.send(data);
})
router.get('/admin/transactions',async(req,res)=>{
    const data = await Transaction.find();
    res.send(data);
})
router.get('/search',async(req,res)=>{
    const data = await Professional.find();
    res.send(data);
})
router.get('/pro/cusNotify',authenticatePro,async(req,res)=>{
    // res.send(req.rootUser);
    const data = await Transaction.find({"professional.email" : req.rootUser.email})
    res.send(data)
});
router.get('/pro/cusReview',authenticatePro,async(req,res)=>{
    res.send(req.rootUser);
    // const data = await Profes.find({"professional.email" : req.rootUser.email})
    
});

module.exports = router;
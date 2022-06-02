const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');

require('../db/conn');

const Customer = require("../models/customer.model");
const Professional = require("../models/pro.model");


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
            return res.status(422).json({ error: "Email already exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
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
            return res.status(422).json({ error: "Email already exist" });
        }else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        }else{
            const user = new Professional({ name, email, phoneNo, password, cpassword, address, city, state, profession, gender });
        const professionalRegister = await user.save();
        res.status(201).json({ message: "User added successfully in the database" });
        }  
    } catch (err) {
        console.log(err);
    }
});

// Login route

router.post('/login-signup', async (req, res) => {
    // console.log(req.body);
    // res.json({message:"cool"});
    try {
        let token
        const { email, password } = req.body;

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
                 token = await userLogin.generateAuthToken();
                 res.cookie("jwtToken",token,{
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
            token = await userLogin.generateAuthToken();
            console.log(token)
            res.cookie("jwtToken",token,{
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




module.exports = router;
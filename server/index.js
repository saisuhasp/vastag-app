// require('dotenv').config()
// const express = require('express')
// const cors  = require('cors');
// const mongoose = require('mongoose');
// const jwt = require("jsonwebtoken")
// const professionalModel = require('./models/pro.model')
// const customerModel = require('./models/customer.model')

// const app = express();
// const PORT = 5000;
// app.use(cors())
// app.use(express.json())

// mongoose.connect(process.env.DATABASE_CONNECTION,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
// const db = mongoose.connection;
//     db.on("error", console.error.bind(console, "connection error: "));
//     db.once("open", function () {
//       console.log("Connected successfully");
//     });    

// app.get("/",(req,res)=>{
//     res.send("hello")
// })
// app.get("/customers",(req,res)=>{
//     res.send("hello customers")
// })
// app.get("*",(req,res)=>{
//     res.send("You opened the wrong page")
// })

// app.listen(PORT, (error) =>{
//     if(!error)
//         console.log("Server is Successfully Running, and App is listening on port "+ PORT)
//     else 
//         console.log("Error occurred, server can't start", error);
//     }
// );

const mongoose  = require('mongoose');
require('dotenv').config()
const express = require("express");
const app  = express();
require('./db/conn');


// const Customer = require('./models/customer.model');

app.use(express.json());


app.use(require('./routes/auth'));
const PORT  = process.env.PORT;





//Middelware 

const middleware = (req,res,next)=>{
    console.log("this is middleware");
    next();
}



//
app.get('/',(req,res)=>{
    res.send('Hello world app.js');
});

app.get('/login-signup',middleware,(req,res)=>{
    res.send('Hello world login');

});

app.get('/signup-pro',(req,res)=>{
    res.send('Hello world signup professional');

});

app.get('/signup-customer',(req,res)=>{
    res.send('Hello world signup customer');

});


app.listen(PORT,()=>{
    console.log(`server is runnning at port ${PORT}`);
})
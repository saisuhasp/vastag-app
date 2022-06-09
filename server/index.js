

const mongoose  = require('mongoose');
require('dotenv').config()
const express = require("express");
const app  = express();
require('./db/conn');
const cookieParser = require('cookie-parser')


// const Customer = require('./models/customer.model');

app.use(express.json());
app.use(cookieParser())

app.use(require('./routes/auth'));
const PORT  = process.env.PORT;








//
// app.get('/',(req,res)=>{
//     res.send('Hello world app.js');
// });

app.get('/login-signup',(req,res)=>{
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
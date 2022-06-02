const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const proSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
        phoneNo:{
            type: String,
            required:true
        },
        password: {
            type: String,
            required: true
        },
        cpassword: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        profession: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
        
    },
    {
        collection:'professional-users'
    }
)

proSchema.pre('save', async function(next){
    // console.log("hello this is bcrpt");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);

    }
    next();
});
proSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;  
    } catch (err) {
        console.log(err);
    }
}

const Professional = mongoose.model("PROFESSIONAL-USER",proSchema);
module.exports = Professional;
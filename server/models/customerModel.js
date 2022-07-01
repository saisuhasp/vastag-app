const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const cusSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNo: {
            type: String,
            required: true
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
        gender: {
            type: String,
            required: true
        },
        date: {
            type: String
        },
        messages: [{
            name: {
                type: String,
                
            },
            email: {
                type: String,
            },
            message: {
                type: String,
            }
        }

        ],
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
    },
    {
        collection: 'customer-users'
    }
)


cusSchema.pre('save', async function (next) {
    // console.log("hello this is bcrpt");
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);

    }
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.date = date + ' ' + time;
    next();
});

cusSchema.methods.generateCusAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

cusSchema.methods.addMessage = async function(name,email,message){
    try{
        this.messages = this.messages.concat({name,email,message})
        await this.save();
        return this.messages;
    }catch(err){
        console.log(err);
    }
}
const Customer = mongoose.model("CUSTOMER-USER", cusSchema);
module.exports = Customer;


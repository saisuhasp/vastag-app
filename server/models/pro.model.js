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
        date: {
            type:String
        },
        tiers:{
            tier1_name: {
                type: String,
            },
            tier1_price: {
                type: String,
            },tier1_details: {
                type: String,
            },tier2_name: {
                type: String,
            },tier2_price: {
                type: String,
            },tier2_details: {
                type: String,
            },tier3_name: {
                type: String,
            },tier3_price: {
                type: String,
            },tier3_details: {
                type: String,
            },

        },
        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
        reviews :[{
            cus_name: {
                type: String,
                
    
            },
            cus_email: {
                type: String,
    
            },
            cus_phoneNo: {
                type: String,
    
            },
            tier_name:{
                type:String,
            },
            
            comment:{
                type : String
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
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.date = date + ' ' + time;
    next();
});
proSchema.methods.generateProAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;  
    } catch (err) {
        console.log(err);
    }
}
proSchema.methods.addTiers = async function(tier1_name,tier1_price,tier1_details,tier2_name,tier2_price,tier2_details,tier3_name,tier3_price,tier3_details){
    try {
        this.tiers = {tier1_name,tier1_price,tier1_details,tier2_name,tier2_price,tier2_details,tier3_name,tier3_price,tier3_details};
        await this.save();
        return this.tiers;
   
    } catch (error) {
        console.log(error);
    }

}
proSchema.methods.addReviews = async function (cus_name,cus_email,cus_phoneNo,comment,tier_name) {
    try {
        
        this.reviews = this.reviews.concat({cus_name:cus_name,cus_email:cus_email,cus_phoneNo:cus_phoneNo,comment:comment,tier_name:tier_name});
        await this.save();
        return this.reviews;
        // console.log(cus_name,cus_email,cus_phoneNo,comment);  
    } catch (err) {
        console.log(err);
    }
}
const Professional = mongoose.model("PROFESSIONAL-USER",proSchema);
module.exports = Professional;
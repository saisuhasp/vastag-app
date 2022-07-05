const mongoose = require("mongoose");

const transSchema = new mongoose.Schema({

    customer: {
        name: {
            type: String,

        },
        email: {
            type: String,

        },
        phoneNo: {
            type: String,

        },
        address: {
            type: String,

        },
        city: {
            type: String,

        },
        state: {
            type: String,

        },

    },
    professional: {
        name: {
            type: String,

        },
        email: {
            type: String,

        },
        phoneNo: {
            type: String,

        },
        rating: {
            type: String,

        },
        profession: {
            type: String,

        },
        tier_name: {
            type: String,

        },
        tier_price: {
            type: String,

        },
    },
    date: {
        type: String,

    },
    review :{
        cus_name: {
            type: String,
            

        },
        cus_email: {
            type: String,

        },
        cus_phoneNo: {
            type: String,

        },
        pro_name: {
            type: String,

        },
        pro_email: {
            type: String,

        },
        pro_phoneNo: {
            type: String,

        },
        comment:{
            type : String,
            default: ""
        }
    }
},
    {
        collection: 'transactions'
    }
)
transSchema.pre('save', async function (next) {
    // console.log("hello this is bcrpt");
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.date = date + ' ' + time;
    this.review.cus_name = this.customer.name
    this.review.cus_email = this.customer.email
    this.review.cus_phoneNo = this.customer.phoneNo
    this.review.pro_name = this.professional.name
    this.review.pro_email = this.professional.email
    this.review.pro_phoneNo = this.professional.phoneNo

    next();
});

transSchema.methods.addReview = async function(reviewText){
    // console.log(reviewText)
    this.review.comment  = reviewText
}

const Transaction = mongoose.model("TRANSACTION", transSchema);
module.exports = Transaction;
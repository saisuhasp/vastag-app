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
    next();
});

const Transaction = mongoose.model("TRANSACTION", transSchema);
module.exports = Transaction;
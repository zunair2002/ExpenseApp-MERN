// models/usermodel.js

const mongoose = require("mongoose");

//DB schema
const transactionschema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: [true, 'amount is required']
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    },
    reference: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    date: {
        type: Date
    }
}, { timestamps: true });

//export
const transactionmodel = mongoose.model("transaction", transactionschema);
module.exports = transactionmodel;
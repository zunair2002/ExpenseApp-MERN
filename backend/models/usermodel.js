// models/usermodel.js

const mongoose = require("mongoose");

//DB schema
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email must be required and must be unique'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must be required'],
    },
}, { timestamps: true });

//export
const usermodel = mongoose.model("users", userschema);
module.exports = usermodel;
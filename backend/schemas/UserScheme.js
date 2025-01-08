const mongoose = require("mongoose")

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    phone: Number
})

module.exports = userSchema
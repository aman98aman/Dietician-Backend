const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    name: String,
    email: String,
    description:String,
    phoneNumber:String
})

const Request = mongoose.model('Requests', requestSchema);
module.exports = Request;
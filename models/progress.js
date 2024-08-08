
const mongoose = require('mongoose');

const imageShema = new mongoose.Schema({
    user: {
        type:String,
        unique:true
    },
    images:[{
        weight: Number,
        name: String,
        img: {
            data: Buffer,
            contentType: String
        },
        _id: false
    }]
})

const Progress = mongoose.model('Progress', imageShema);

module.exports = Progress;
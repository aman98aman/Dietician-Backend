
const mongoose = require('mongoose');

const imageShema = new mongoose.Schema({
    user: {
        type:String,
        unique:true
    },
    images:[{
        weight: Number,
        name: String,
        createdAt: {
            type: Date,
            default: Date.now
        },    
        img: {
            data: Buffer,
            contentType: String
        },
        _id: false
    }]
})

const Progress = mongoose.model('Progress', imageShema);

module.exports = Progress;
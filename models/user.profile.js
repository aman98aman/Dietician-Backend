
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type:String,
        unique:true
    },
    imgName: String,
    img: {
        data: Buffer,
        contentType: String
}
})

const ProfilePic = mongoose.model('ProfilePic', profileSchema);

module.exports = ProfilePic;
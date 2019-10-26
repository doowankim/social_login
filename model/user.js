const mongoose = require('mongoose');
const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, //email이 하나만 들어가도록 하는것 (중복금지)
        lowercase: true //소문자로 다 인식(대문자가 들어가도)
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('user', userSchema);
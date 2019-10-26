const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

userSchema.pre('save', async function(next){
    try{
        console.log('entered'); //저장을 할때 내보내는 메시지
        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash; //passwordHash가 this.password에 들어가고 위의 password에 암호화되어 들어간다

        console.log('Exited');
        next();
    }
    catch(error){
        next(error); //error를 내보낸다
    }
});


module.exports = mongoose.model('user', userSchema);
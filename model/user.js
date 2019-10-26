const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({

    // username: {
    //     type: String,
    //     required: true
    // },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true, //email이 하나만 들어가도록 하는것 (중복금지)
    //     lowercase: true //소문자로 다 인식(대문자가 들어가도)
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'], //3개중에 하나가 선택되서 아래중에 하나로 동작
        required: true
    },

    local: {
        username: {
            type: String
        },
        email: {
            type: String,
            lowercase: true //소문자로 다 인식(대문자가 들어가도)
        },
        password: {
            type: String
        }
    },
    google: {

    },
    facebook: {

    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next){ //pre는 userSchema에 저장하기 전이라는 뜻
    try{
        console.log('entered'); //username, email, password를 저장할때 내보내는 메시지
        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(this.local.password, salt);
        this.local.password = passwordHash; //passwordHash가 this.local.password에 들어가고 위의 password에 암호화되어 들어간다

        console.log('Exited');
        next();
    }
    catch(error){
        next(error); //error를 내보낸다
    }
});

userSchema.methods.isValidPassword = async function(newPassword){
    try {
        return await bcrypt
            .compare(newPassword, this.local.password); //사용자입력password랑 db에 있는 password랑 비교검증
    }
    catch(error){
        throw new Error(error);
    }
};


module.exports = mongoose.model('user', userSchema);
const express = require('express');
const router = express.Router();
const userModel = require('../../model/user');
const jwt = require('jsonwebtoken');
const {schemas, validateBody} = require('../../helpers/routeHelpers'); //routeHelpers안에있는 schemas를 불러옴
const passport = require('passport');
const passportConf = require("../../passport");
const localAuthCheck = passport.authenticate('local', {session: false});
const passportJwt = passport.authenticate('jwt', {session: false});

//token 생성
signToken = user => {
    return jwt.sign({
        iss: 'doowankim',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) //token이 발행되면 하루동안 유효하다는 뜻
    }, process.env.SECRET);
};





// @route POST localhost:1500/users/signup
// @desc register user
// @access Public
router.post('/signup',validateBody(schemas.signupSchema), async (req, res) => { //async가 들어가면 await가 같이 움직인다(비동기 방식)

    const {username, email, password} = req.body;

    const foundUser = await userModel.findOne({"local.email": email}); //사용자입력값의 email을 찾는다
    if(foundUser){
        return res.json({
            msg: 'email is already is use'
        });
    }

    const newUser = new userModel({
        method: 'local',
        local: {
            username: username,
            email: email,
            password: password
        }
    });//newUser로 username, email, password 정보저장
    const token = signToken(newUser);
    await newUser.save()
        .then(user => {
            res.json({
                msg: 'Created',
                userInfo: user,
                tokenInfo: token
            });
        });



});

// @route POST localhost:1500/users/login
// @desc login user
// @access Private
router.post('/login', localAuthCheck, (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({
        tokenInfo: token
    });
});

// @route POST localhost:1500/users/google
// @desc google login
// @access Private
router.post('/google', passport.authenticate('googleToken', { session: false }), (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({
        tokenInfo: token
    });
});


module.exports = router;
const express = require('express');
const router = express.Router();
const userModel = require('../../model/user');

// @route POST localhost:1500/users/signup
// @desc register user
// @access Public
router.post('/signup', async (req, res) => { //async가 들어가면 await가 같이 움직인다(비동기 방식)

    const {username, email, password} = req.body;

    const foundUser = await userModel.findOne({email}); //사용자입력값의 email을 찾는다
    if(foundUser){
        return res.json({
            msg: 'email is already is use'
        });
    }

    const newUser = new userModel({ username, email, password }); //newUser로 username, email, password 정보저장
    await newUser.save()
        .then(user => {
            res.json({
                msg: 'Created',
                userInfo: user
            });
        });



});

// @route POST localhost:1500/users/login
// @desc login user
// @access Public
router.post('/login', (req, res) => {
    res.json({ msg: 'Successful login'});
});


module.exports = router;
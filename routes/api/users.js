const express = require('express');
const router = express.Router();

// @route POST localhost:1500/users/signup
// @desc register user
// @access Public
router.post('/signup', (req, res) => {
    res.json({ msg: 'Successful signup'});
});

// @route POST localhost:1500/users/login
// @desc login user
// @access Public
router.post('/login', (req, res) => {
    res.json({ msg: 'Successful login'});
});


module.exports = router;
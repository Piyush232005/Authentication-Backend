const express = require('express');
const userModel = require('../models/user.model');

const router = express.Router();


router.post('/register', async (req, res) => {
    // Registration logic here
    const { username, password } = req.body;
    const user = await userModel.create({
        username, password
    })
    res.status(201).json({
        message: 'User registered successfully',
        user
    });
})

router.post('/login', async (req, res) => {
    // Login logic here
    const { username, password } = req.body;

    const user = await userModel.findOne({
        username: username,

    })
    if (!user) {
        return res.status(401).json({
            message: 'User not found'
        });
    }
    const isPasswordvalid = password === user.password;
    if(!isPasswordvalid) {
        return res.status(401).json({
            message: 'Invalid password'
        });
    }
})

module.exports = router;
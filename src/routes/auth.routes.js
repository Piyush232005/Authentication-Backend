const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const router = express.Router();


router.post('/register', async (req, res) => {
    // Registration logic here
    const { username, password } = req.body;
    const user = await userModel.create({
        username, password
    })
    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET )
    
    res.cookie('token', token)

    res.status(201).json({
        message: 'User registered successfully',
        user,token
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

    res.status(200).json({
        message: 'User logged in successfully',
        user
    });
})

router.get('/user', async (req, res) => {
    // Get user logic here
    const {token} = req.cookies;

    if(!token){
        return res.status(401).json({
            message: 'Unauthorized access'
        });
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id: decoded.id
        }).select('-password'); // Exclude password from the response

        res.status(200).json({
            message: 'User retrieved successfully',
            user
        });
    }catch (error){
        return res.status(401).json({
            message: 'Invalid token'
        });
    }


    
});    

module.exports = router;
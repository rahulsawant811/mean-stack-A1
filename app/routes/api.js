const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

router.post('/users', (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    if(
        req.body.username == null || req.body.username == '' ||
        req.body.password == null || req.body.password == '' ||
        req.body.email == null || req.body.email == ''
    ){
        res.send("Ensure username, password and email were provided");
    } else {
        user.save(function(err){
            if(err){
                res.send('Username or email already exists');
            } else {
                res.send("User created successfully");
            }
        });
    }
});

module.exports = router;

const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const User = require('./app/models/user');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/mean-app", (err) => {
    if(err){
        console.log("Error: "+ err);
    } else {
        console.log("Connected to the MongoDB");
    }
});

app.post('/users', (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Running on port "+ port);
})

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

    user.save();

    res.send("User created successfully");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Running on port "+ port);
})

const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        require: true
    },
});

userSchema.pre('save', function(next) {
    let user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);

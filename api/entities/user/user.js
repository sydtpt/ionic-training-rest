var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    username : { type : String, required : [true, 'username is required'] },
    password : {type : String, required : [true, 'password is required'] }
}, {timestamps: true});

var User = mongoose.model('User', UserSchema);

module.exports = User;
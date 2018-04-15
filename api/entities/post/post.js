var mongoose = require("mongoose");
var PostSchema = new mongoose.Schema({

    user : { type : String, required : [true, 'user is required'] },
    photo : { type : String, required : [true, 'photo is required'] },
    legend : { type : String, required : [true, 'legend is required'] },
    likes: [{
        username: String,
    }],
    comments : [{
        username: String,
        comment: String
    }]
}, {timestamps: true});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
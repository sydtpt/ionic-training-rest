module.exports = (function() {
    var router = require('express').Router();
    let Post = require('../post/post');
    router.get('/',function(req,res){
        Post.find({}).sort('-updatedAt').exec(function(err, posts){
            res.status(200);
            res.send(posts);
        });
    });
    return router;
})();

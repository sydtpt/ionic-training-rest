module.exports = (function() {
    var router = require('express').Router();
    let Post = require('../post/post');
    router.get('/',function(req,res){
        let lastDate = req.query.createdBefore;
        let filter = {};
        if(lastDate){
            filter = { createdAt:{$lt: lastDate}};
        }

        Post.find(filter).sort('-createdAt').limit(3).exec(function(err, posts){
            res.status(200);
            res.send(posts);
        });
    });
    return router;
})();

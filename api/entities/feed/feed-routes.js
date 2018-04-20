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
            let response = {
                posts:posts 
            }
            res.send(posts);
        });
    });

    router.delete('/',function(req,res){
        Post.remove({});
        res.status(200);
        res.send('All posts has been deleted!');
    });

    router.delete('/:id',function(req,res){
        Post.findOneAndRemove({_id: req.path.id});
        res.status(200);
        res.send('All posts has been deleted!');
    });

    return router;
})();

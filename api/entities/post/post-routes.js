module.exports = (function() {
    var router = require('express').Router();
    let Post = require('./post');
    router.post('/',function(req,res){
        //validations
        if(!req.body.image){
            res.status(400);
            res.send({message: 'image must be passed!'});
            return;
        }
        let post;
        
        post.photo = req.body.image;
        if(!req.body.user){
            post.user = 'Totver'
        }

        if(!req.body.legend){
            post.legend = '';
        }
        post.comments = [];
        post.likes = [];

        post = new Post(post);
        post.save();    
        res.status(201);
        res.send({
            message: 'Post sent'
        });				
    });

    router.post('/:postId',function(req,res){
        //like
        Post.findById(req.params.postId, function (err, post) { 
            post.likes.push({username: req.body.user});
            post.save();    
            res.status(201);
            res.send({
                message: 'Post liked'
            });
        });
    });
    return router;
})();
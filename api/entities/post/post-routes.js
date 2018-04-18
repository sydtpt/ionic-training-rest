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
        let post = {};
        
        post.photo = req.body.image;
        if(!req.body.user){
            post.user = 'Totver'
        }else{
            post.user = req.body.user;
        }
        
        post.legend = req.body.legend;
        post.comments = [];
        post.likes = [];

        post = new Post(post);
        post.save().then(function(){
            res.status(201);
            res.send({
                message: 'Post sent'
            });	
        }).catch(function(err){
            res.status(500);
            res.send(err);
        });    
    });

    router.post('/:postId',function(req,res){
        if(!req.query.action){
            res.status(400);
            res.send({
                message: 'queryparam action is required! Options: like or comment'
            });	
            return;
        }

        if(req.query.action === 'like'){
            if(!req.body.username){
                res.status(400);
                res.send({
                    message: 'field username is required!'
                });	
                return;
            }
            Post.findById(req.params.postId, function (err, post) { 
                post.likes.push({username: req.body.user});
                post.save().then(function(){
                    res.status(201);
                    res.send({
                        message: 'Post liked'
                    });
                }).catch(function(err){
                    res.status(500);
                    res.send(err);
                });    
            });        
        }

        if(req.query.action === 'comment'){
            if(!req.body.username){
                res.status(400);
                res.send({
                    message: 'field username is required!'
                });	
                return;
            }
            if(!req.body.comment){
                res.status(400);
                res.send({
                    message: 'field comment is required!'
                });	
                return;
            }
            Post.findById(req.params.postId, function (err, post) { 
                post.comments.push({username: req.body.username, comment: req.body.comment});
                post.save().then(function(){
                    res.status(201);
                    res.send({
                        message: 'comment registered!'
                    });
                }).catch(function(err){
                    res.status(500);
                    res.send(err);
                });    
            });        
        }   
    });
    return router;
})();

module.exports = (function() {
    var router = require('express').Router();
    let User = require('./user');
    router.post('/',function(req,res){
        if(!req.body.username || !req.body.password){
            res.status(400);
            res.send({message: 'Username and password must be passed!'});
            return;
        }
        let newUser = {
            username: req.body.username,
            password: req.body.password
        }
        User.findOne({username: newUser.username},function(err,user){
            if(err){
                res.status(500);
                res.send({message: 'Internal server error'});
                return;
            }
            if(user){
                res.status(401);
                res.send({message: 'User already registered'});
                return;
            }
            newUser = new User(newUser);
            newUser.save(err => {
                if(err){
                    res.status(400);
                    res.send({message: 'Username and password must be passed!'});
                }else{
                    res.status(201);
                    res.send({
                        message: 'User created'
                    }); 
                }
            });
        });
    });

    // Rotas
    router.get('/', function(req, res) {
        res.status(200);
        res.send([
            {
                name: 'sydnei'
            }
        ]);
    });

    return router;
})();

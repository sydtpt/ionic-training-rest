module.exports = (function() {
    var router = require('express').Router();

    router.use('/user', require('./entities/user/user-routes'));
    router.use('/posts', require('./entities/feed/feed-routes'));
    router.use('/post', require('./entities/post/post-routes'));

    return router;
})();
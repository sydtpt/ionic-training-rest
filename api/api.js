module.exports = (function() {
    var router = require('express').Router();

    // router.use('/v1/data', require('./entities/entities-routes'));
    // router.use('/v1/'    , require('./modules/modules-routes.js'));
    router.use('/user', require('./entities/user/user-routes'));

    return router;
})();
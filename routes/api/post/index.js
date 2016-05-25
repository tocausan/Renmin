'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router();

module.exports = router;


router.use(function(req, res, next) {
    console.log(chalk.inverse('API post middelware'), chalk.dim(req.method), req.url);

    switch (true){
        case(req.session.auth && req.session.auth.status >= 3):
            next();
            break;
        default :
            res.format({
                html: function(){
                    res.redirect("/log/in?redirect=post");
                },
                json: function(){
                    res.json({error: 'access not allowed.'});
                }
            });
            break;
    }
});


// route
router.use('/', require('./root'));
router.use('/category', require('./category-post'));
//router.use('/category-edit', require('./category-edit'));
router.use('/id', require('./id'));
router.use('/create', require('./create'));
router.use('/edit', require('./edit'));
router.use('/edit-image', require('./edit-image'));

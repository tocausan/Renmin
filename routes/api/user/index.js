'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = router;


// Log middelware
router.use(function(req, res, next) {
    console.log(chalk.inverse('API log middelware'), chalk.dim(req.method), req.url);
    console.log(chalk.dim(__dirname));

    // access for auth and status 2+
    switch (true){
        case(req.session.auth && req.session.auth.status >= 2):
            next();
            break;

        default :
            res.format({
                html: function(){
                    res.redirect("/log?redirect=user");
                },
                json: function(){
                    res.json({error: 'Access not allowed.'});
                }
            });
            break;
    }
});


// route
router.use('/', require('./root'));
router.use('/create', require('./create'));
router.use('/id', require('./id'));
router.use('/edit', require('./edit'));
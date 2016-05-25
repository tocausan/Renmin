'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router();

module.exports = router;


// Middelware
router.use(function(req, res, next) {
    console.log(chalk.inverse('API profile middelware'), chalk.dim(req.method), req.url);
    console.log(chalk.dim(__dirname));

    switch (true){
        case(req.session.auth != null):
            next();
            break;

        default :
            res.format({
                html: function(){
                    res.redirect("/log?redirect=profile");
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
router.use('/edit', require('./edit'));
router.use('/edit-avatar', require('./edit-avatar'));
router.use('/edit-password', require('./edit-password'));


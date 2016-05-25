'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router();

module.exports = router;


// Log middelware
router.use(function(req, res, next) {
    console.log(chalk.inverse('API log middelware'), chalk.dim(req.method), req.url);
    console.log(chalk.dim(__dirname));

    switch (true){
        case(req.session.auth != null && req.url != '/out'):
            res.format({
                html: function(){
                    res.redirect('/');
                },
                json: function(){
                    res.json({message: 'Already connected.'});
                }
            });
            break;

        default :
            next();
            break;
    }
});


// route
router.use('/', require('./root'));
router.use('/in', require('./in'));
router.use('/out', require('./out'));
'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router();

module.exports = router;


// Sign middelware
router.use(function(req, res, next) {
    console.log(chalk.inverse('Sign middelware'), chalk.dim(req.method), req.url);
    console.log(chalk.dim(__dirname));

    if(req.session.auth){
        res.format({
            html: function(){
                res.redirect('/profile');
            },
            json: function(){
                res.json({error: 'Already connected.'});
            }
        });
        res.redirect('/');
    } else {
        next();
    }
});


// route
router.use('/', require('./root'));
router.use('/in', require('./in'));
router.use('/confirmation', require('./confirmation'));


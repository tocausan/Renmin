/**
 * Post
 */

'use strict';

var chalk = require('chalk'),
    consoleLog = chalk.yellow('routes/post/index.js'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

module.exports = router;


/**
 * Post middelware
 */
/*
router.use(function(req, res, next) {
    console.log(chalk.inverse('set middelware'), chalk.dim(req.method), req.url)

    if(req.session.auth && req.session.auth.status >= 3){
        next();
    }
    else{
        res.format({
            // HTML response
            html: function(){
                res.redirect("/login?redirect=set");
            },
            //JSON response
            json: function(){
                res.json('access not allowed');
            }
        });
    }
});




/**
 * Root
 */
router.route('/')

    // GET setting
    .get(function(req, res, next) {
        console.log(consoleLog, 'router.route(/).get()');

        res.format({
            // HTML response
            html: function(){
                res.render('post/index', {
                    auth: req.session.auth,
                    title: 'Posts',
                    success: req.query.success,
                    error: req.query.error
                });
            }
        });
    });



/**
 * Set homepage
 */
router.use('/homepage', require('./homepage'));



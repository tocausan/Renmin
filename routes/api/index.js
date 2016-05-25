'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router();

module.exports = router;


// API middelware
router.use(function(req, res, next) {
    console.log(chalk.inverse('API middelware'), chalk.dim(req.method), req.url);
    console.log(chalk.dim(__dirname));

    next();
});


// route
// home
router.use('/', require('./root'));
router.use('/home', require('./root'));
// session
router.use('/session', require('./session'));
// sign
router.use('/sign', require('./sign'));
router.use('/signin', require('./sign'));
// log
router.use('/log', require('./log'));
router.use('/login', require('./log'));
// profile
router.use('/profile', require('./profile'));
// user
router.use('/user', require('./user'));
//post
router.use('/post', require('./post'));


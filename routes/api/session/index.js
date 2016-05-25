'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router();

module.exports = router;


// Middelware
router.use(function(req, res, next) {
    console.log(chalk.inverse('API session middelware'), chalk.dim(req.method), req.url);
    console.log(chalk.dim(__dirname));

    next();
});


// route
router.use('/', require('./root'));

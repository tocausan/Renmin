'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router();

module.exports = router;


// Home middelware
router.use(function(req, res, next) {
    console.log(chalk.inverse('API home middelware'), chalk.dim(req.method), req.url);
    console.log(chalk.dim(__dirname));

    next();
});


// route
router.use('/', require('./root'));
router.use('/undefined', require('./undefined'));
router.use('/category', require('./category'));

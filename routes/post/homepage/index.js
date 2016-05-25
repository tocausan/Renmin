'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    gm = require('gm'),
    mongoose = require('mongoose'),
    PostHomepage = mongoose.model('post-homepage');

module.exports = router;


// Middelware
router.use(function(req, res, next) {
    console.log(chalk.inverse('Post homepage middelware'), chalk.dim(req.method), req.url);
    console.log(chalk.dim(__dirname));

    next();
});


// route
router.use('/', require('./root'));
router.use('/create', require('./create'));
router.use('/edit', require('./edit'));
router.use('/edit-image', require('./edit-image'));


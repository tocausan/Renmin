'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router();

module.exports = router;


router.get('/', function(req, res, next) {
    console.log(req.session);
    res.json(req.session);
});
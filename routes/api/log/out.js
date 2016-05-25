'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = router;


router.route('/')

    .get(function(req, res, next){

        // delete session
        delete req.session.auth;

        res.format({
            html: function(){
                res.redirect("/");
            },
            json: function(){
                res.json({success: 'Logged out.'});
            }
        });
    });
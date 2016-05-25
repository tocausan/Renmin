'use strict';

var chalk = require('chalk'),
    express = require('express'),
    app = express(),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = router;


router.route('/')

    .get(function(req, res, next) {
        // get all users
        User.find({}, function (err, users) {
            res.format({
                html: function(){
                    res.render('user/index', {
                        auth: req.session.auth,
                        title: 'User index',
                        users: users,
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json(users);
                }
            });
        });
    });


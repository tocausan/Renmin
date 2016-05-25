'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = router;


router.route('/')

    .get(function(req, res, next) {

        // get user
        User.findById(req.session.auth._id, function (err, user){

            res.format({
                html: function(){
                    res.render('profile/index', {
                        auth: user,
                        title: 'Profile',
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json({message: user});
                }
            });
        });
    });






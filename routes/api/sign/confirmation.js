'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = router;


var msg = {
    0: 'User confirmed.',
    1: 'Wrong email or confirmation code.'
};


router.route('/')

    .get(function(req, res, next) {
        User.findOne({ email: req.query.email }, function (err, user){
            console.log(chalk.inverse(user));

            switch (true){
                case(user != null && req.query.confirmation === user.confirmation):
                    // confirm user
                    user.confirmed = true;
                    user.save(function(){
                        if(err) return console.log(chalk.bgRed(err));

                        res.format({
                            html: function(){
                                res.redirect('/log' +
                                    '?success='+ msg[0] +
                                    '&username='+ user.username
                                );
                            },
                            json: function(){
                                res.json({success: msg[0]});
                            }
                        });
                    });
                    break;

                default :
                    res.format({
                        html: function(){
                            res.render('error', {
                                title: 'Email confirmation',
                                error: msg[1]
                            });
                        },
                        json: function(){
                            res.json({error: msg[1]});
                        }
                    });
                    break;
            }
        });

    });
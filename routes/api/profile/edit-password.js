'use strict';

var chalk = require('chalk'),
    express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    passwordHash = require('password-hash'),
    User = mongoose.model('user'),
    UserPassword = mongoose.model('user-password');

module.exports = router;


var msg = {
    0: 'Password must match password confirmation.',
    1: 'Password must contain at least 6 characters.',
    2: 'Password updated.'
};


router.route('/')

    .get(function(req, res, next) {

        User.findById(req.session.auth._id, function (err, user){

            res.format({
                html: function(){
                    res.render('profile/edit-password', {
                        auth: req.session.auth,
                        user: user,
                        title: 'Edit password',
                        success: req.query.success,
                        error: req.query.error
                    });
                },
                json: function(){
                    res.json({message: 'API/profile/edit-password'});
                }
            });
        });
    })

    .post(function(req, res) {
        switch (false){

            case(req.body.password === req.body.passconf):
                // password and confirmation not match
                console.log(chalk.bgRed(msg[0]));

                res.format({
                    html: function(){
                        res.redirect('?error='+ msg[0]);
                    },
                    json: function(){
                        res.json({error: msg[0]});
                    }
                });
                break;

            case(req.body.password.length > 5):
                // password length too short
                res.format({
                    html: function(){
                        res.redirect('?error='+ msg[1]);
                    },
                    json: function(){
                        res.json({error: msg[1]});
                    }
                });
                break;

            default :
                // update password
                UserPassword.findOne({ 'user': req.session.auth._id }, function (err, password) {
                    password.password = passwordHash.generate(req.body.password);
                    password.save(function(err, user) {
                        if(err) return console.log(chalk.bgRed(err));

                        res.format({
                            html: function(){
                                res.redirect('/profile?success='+ msg[2]);
                            },
                            json: function(){
                                res.json({success: msg[2]});
                            }
                        });
                    });
                });
                break;
        }
    })

    .put(function(req, res) {
        switch (false){

            case(req.body.password === req.body.passconf):
                // password and confirmation not match
                console.log(chalk.bgRed(msg[0]));

                res.format({
                    html: function(){
                        res.redirect('?error='+ msg[0]);
                    },
                    json: function(){
                        res.json({error: msg[0]});
                    }
                });
                break;

            case(req.body.password.length > 5):
                // password length too short
                res.format({
                    html: function(){
                        res.redirect('?error='+ msg[1]);
                    },
                    json: function(){
                        res.json({error: msg[1]});
                    }
                });
                break;

            default :
                // update password
                UserPassword.findOne({ 'user': req.session.auth._id }, function (err, password) {
                    password.password = passwordHash.generate(req.body.password);
                    password.save(function(err, user) {
                        if(err) return console.log(chalk.bgRed(err));

                        res.format({
                            html: function(){
                                res.redirect('/profile?success='+ msg[2]);
                            },
                            json: function(){
                                res.json({success: msg[2]});
                            }
                        });
                    });
                });
                break;
        }
    });
